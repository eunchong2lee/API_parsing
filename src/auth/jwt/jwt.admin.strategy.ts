import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { jwtConstants } from '../constants/constants';
import { AdminUserService } from '../admin-auth.service';

@Injectable()
export class JwtTestStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: AdminUserService) {
    // 의존성 주입

    super({
      // jwt 에 대한 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // secretOrKey: this.configService.get('TOKEN_SECRET'),

      // error로 인한 지움
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
    // token = this.configService.get('TOKEN_SECRET')
  }

  async validate(payload: Payload) {
    //   async validate(payload) {
    console.log(payload);
    const userId = payload.uid;
    const user = await this.userService.findOne({ _id: userId });

    if (user) {
      return user; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
