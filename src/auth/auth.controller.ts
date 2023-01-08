import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/admin-user.decorator';
import { JwtAuthGuard } from './jwt/jwt.payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() body) {
    console.log(body);
    return await this.authService.signUp(body);
  }

  @Post('/login')
  async logIn(@Body() data) {
    return this.authService.jwtLogIn(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async getAuthUser(@CurrentUser() user) {
    return user;
  }
}
