import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createGuest(): Promise<{
        guestId: string;
        accessToken: string;
        expiresIn: number;
    }>;
    register(body: any): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    login(body: any): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    linkGuest(user: any, body: {
        guestId: string;
    }): Promise<{
        success: boolean;
    }>;
}
