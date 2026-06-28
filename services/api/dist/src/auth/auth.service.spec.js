"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
describe('AuthService', () => {
    let service;
    let prisma;
    let jwtService;
    const mockPrismaService = {
        user: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        session: {
            create: jest.fn(),
        },
        quizAttempt: {
            updateMany: jest.fn(),
        },
        aiConversation: {
            updateMany: jest.fn(),
        },
        enrollment: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        $transaction: jest.fn((callback) => callback(mockPrismaService)),
    };
    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
                { provide: jwt_1.JwtService, useValue: mockJwtService },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        prisma = module.get(prisma_service_1.PrismaService);
        jwtService = module.get(jwt_1.JwtService);
        jest.clearAllMocks();
    });
    describe('createGuest', () => {
        it('should create a GUEST user and return access token', async () => {
            const mockUser = { id: 'guest-uuid', role: 'GUEST' };
            mockPrismaService.user.create.mockResolvedValue(mockUser);
            mockPrismaService.session.create.mockResolvedValue({});
            const result = await service.createGuest();
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: { role: 'GUEST', status: 'ACTIVE' },
            });
            expect(jwtService.sign).toHaveBeenCalled();
            expect(result).toHaveProperty('guestId', 'guest-uuid');
            expect(result).toHaveProperty('accessToken', 'mock-jwt-token');
        });
    });
    describe('register', () => {
        it('should throw BadRequestException if user already exists', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue({ id: 'existing-id' });
            await expect(service.register({ email: 'test@example.com', password: 'password' })).rejects.toThrow(common_1.BadRequestException);
        });
        it('should hash password and create a new USER', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            mockPrismaService.user.create.mockResolvedValue({
                id: 'new-user-id',
                email: 'test@example.com',
                role: 'USER',
            });
            const result = await service.register({
                email: 'test@example.com',
                password: 'password',
                fullName: 'Test User',
            });
            expect(prisma.user.create).toHaveBeenCalled();
            expect(result).toHaveProperty('userId', 'new-user-id');
        });
    });
    describe('login', () => {
        it('should throw UnauthorizedException on invalid credentials', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            await expect(service.login({ email: 'test@example.com', password: 'password' })).rejects.toThrow(common_1.UnauthorizedException);
        });
        it('should validate password and return access token', async () => {
            const hashedPassword = await bcrypt.hash('password', 10);
            mockPrismaService.user.findUnique.mockResolvedValue({
                id: 'user-id',
                email: 'test@example.com',
                passwordHash: hashedPassword,
                role: 'USER',
            });
            const result = await service.login({
                email: 'test@example.com',
                password: 'password',
            });
            expect(result).toHaveProperty('accessToken', 'mock-jwt-token');
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map