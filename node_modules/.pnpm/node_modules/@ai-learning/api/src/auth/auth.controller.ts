import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. Create Guest Session
  @Post('guest')
  async createGuest() {
    return this.authService.createGuest();
  }

  // 2. Register
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  // 3. Login
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  // 4. Link Guest Account to Logged-in User
  @Post('link-guest')
  @UseGuards(JwtAuthGuard)
  async linkGuest(
    @CurrentUser() user: any,
    @Body() body: { guestId: string },
  ) {
    return this.authService.linkGuest(body.guestId, user.userId);
  }
}
