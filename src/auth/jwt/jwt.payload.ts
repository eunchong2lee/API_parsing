import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('sec') {}
export interface Payload {
  uid: number;
  email: string;
}
