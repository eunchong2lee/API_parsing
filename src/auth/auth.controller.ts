import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/admin-user.decorator';
import { JwtAuthGuard } from './jwt/jwt.guard';

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
    console.log('hello');
    return await this.authService.jwtLogIn(data);
  }

  @Post('/checkaccount')
  async CheckAccount(@Body() data) {
    console.log('실행');
    return await this.authService.checkaccount(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async getAuthUser(@CurrentUser() user) {
    console.log('user', user);
    return user;
  }
}
