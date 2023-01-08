import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserService } from './admin-auth.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminUserEntity } from './entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secure',
      signOptions: { expiresIn: '1d' },
    }),
    // forwardRef(() => AdminUserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminUserService],
  exports: [AuthService, AdminUserService],
})
export class AuthModule {}
