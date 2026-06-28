"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
const crypto = require("crypto");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createGuest() {
        const guestUser = await this.prisma.user.create({
            data: {
                role: client_1.Role.GUEST,
                status: client_1.UserStatus.ACTIVE,
            },
        });
        const token = this.jwtService.sign({
            sub: guestUser.id,
            userId: guestUser.id,
            role: client_1.Role.GUEST,
            jti: crypto.randomUUID(),
        });
        const expiresIn = 7 * 24 * 60 * 60;
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
    async register(dto) {
        const { email, password, fullName } = dto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existing) {
            throw new common_1.BadRequestException('Email is already registered');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
                role: client_1.Role.USER,
                status: client_1.UserStatus.ACTIVE,
            },
        });
        const token = this.jwtService.sign({
            sub: newUser.id,
            userId: newUser.id,
            role: client_1.Role.USER,
            jti: crypto.randomUUID(),
        });
        const expiresIn = 7 * 24 * 60 * 60;
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
            refreshToken: token,
            expiresIn,
        };
    }
    async login(dto) {
        const { email, password } = dto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async linkGuest(guestId, currentUserId) {
        if (guestId === currentUserId) {
            throw new common_1.BadRequestException('Cannot link user to itself');
        }
        const guestUser = await this.prisma.user.findUnique({
            where: { id: guestId },
        });
        const registeredUser = await this.prisma.user.findUnique({
            where: { id: currentUserId },
        });
        if (!guestUser) {
            throw new common_1.NotFoundException('Guest user not found');
        }
        if (!registeredUser) {
            throw new common_1.NotFoundException('Registered user not found');
        }
        if (guestUser.role !== client_1.Role.GUEST) {
            throw new common_1.BadRequestException('Target user is not a Guest');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.quizAttempt.updateMany({
                where: { userId: guestId },
                data: { userId: currentUserId },
            });
            await tx.aiConversation.updateMany({
                where: { userId: guestId },
                data: { userId: currentUserId },
            });
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
                }
                else {
                    await tx.enrollment.delete({
                        where: { id: enrollment.id },
                    });
                }
            }
            await tx.user.update({
                where: { id: guestId },
                data: { deletedAt: new Date(), status: client_1.UserStatus.INACTIVE },
            });
        });
        return { success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map