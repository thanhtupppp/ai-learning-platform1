import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, UserStatus } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Create Guest Session
  async createGuest() {
    // Create GUEST user in database
    const guestUser = await this.prisma.user.create({
      data: {
        role: Role.GUEST,
        status: UserStatus.ACTIVE,
      },
    });

    // Create session
    const token = this.jwtService.sign({
      sub: guestUser.id,
      userId: guestUser.id,
      role: Role.GUEST,
      jti: crypto.randomUUID(),
    });

    const expiresIn = 7 * 24 * 60 * 60; // 7 days matching JWT configuration
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await this.prisma.session.create({
      data: {
        userId: guestUser.id,
        token: token,
        expiresAt: expiresAt,
        deviceInfo: 'Unknown Device',
      },
    });

    return {
      guestId: guestUser.id,
      accessToken: token,
      expiresIn: expiresIn,
    };
  }

  // 2. Register
  async register(dto: any) {
    const { email, password, fullName } = dto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // Check if user exists
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    });

    // Generate token
    const token = this.jwtService.sign({
      sub: newUser.id,
      userId: newUser.id,
      role: Role.USER,
      jti: crypto.randomUUID(),
    });

    const expiresIn = 7 * 24 * 60 * 60; // 7 days
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await this.prisma.session.create({
      data: {
        userId: newUser.id,
        token: token,
        expiresAt: expiresAt,
      },
    });

    return {
      userId: newUser.id,
      accessToken: token,
      refreshToken: token, // Using single token for baseline; easily expandable to separate RT
      expiresIn,
    };
  }

  // 3. Login
  async login(dto: any) {
    const { email, password } = dto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      userId: user.id,
      role: user.role,
      jti: crypto.randomUUID(),
    });

    const expiresIn = 7 * 24 * 60 * 60;
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        token: token,
        expiresAt: expiresAt,
      },
    });

    return {
      userId: user.id,
      accessToken: token,
      refreshToken: token,
      expiresIn,
    };
  }

  // 4. Link Guest Account to Registered User
  async linkGuest(guestId: string, currentUserId: string) {
    if (guestId === currentUserId) {
      throw new BadRequestException('Cannot link user to itself');
    }

    // Verify both users exist
    const guestUser = await this.prisma.user.findUnique({
      where: { id: guestId },
    });
    const registeredUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!guestUser) {
      throw new NotFoundException('Guest user not found');
    }
    if (!registeredUser) {
      throw new NotFoundException('Registered user not found');
    }

    if (guestUser.role !== Role.GUEST) {
      throw new BadRequestException('Target user is not a Guest');
    }

    // Transactionally merge history from guest to registered user
    await this.prisma.$transaction(async (tx) => {
      // 1. Move quiz attempts
      await tx.quizAttempt.updateMany({
        where: { userId: guestId },
        data: { userId: currentUserId },
      });

      // 2. Move AI conversations
      await tx.aiConversation.updateMany({
        where: { userId: guestId },
        data: { userId: currentUserId },
      });

      // 3. Move enrollments (using safe try-catch wrapper in app workflow or SQL ignores if already exists)
      const guestEnrollments = await tx.enrollment.findMany({
        where: { userId: guestId },
      });

      for (const enrollment of guestEnrollments) {
        const alreadyEnrolled = await tx.enrollment.findFirst({
          where: { userId: currentUserId, courseId: enrollment.courseId },
        });

        if (!alreadyEnrolled) {
          await tx.enrollment.update({
            where: { id: enrollment.id },
            data: { userId: currentUserId },
          });
        } else {
          // If registered user is already enrolled, delete the duplicate guest enrollment
          await tx.enrollment.delete({
            where: { id: enrollment.id },
          });
        }
      }

      // 4. Soft delete / clean up guest user
      await tx.user.update({
        where: { id: guestId },
        data: { deletedAt: new Date(), status: UserStatus.INACTIVE },
      });
    });

    return { success: true };
  }
}
