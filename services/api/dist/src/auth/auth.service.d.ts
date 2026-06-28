import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createGuest(): Promise<{
        guestId: string;
        accessToken: string;
        expiresIn: number;
    }>;
    register(dto: any): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    login(dto: any): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    linkGuest(guestId: string, currentUserId: string): Promise<{
        success: boolean;
    }>;
}
