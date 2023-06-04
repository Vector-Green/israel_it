import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sign(payload: string | object | Buffer): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConfig(this.configService).secret,
    });
  }

  async verify(token: string) {
    return await this.jwtService.verify(token, {
      secret: jwtConfig(this.configService).secret,
    });
  }
}
