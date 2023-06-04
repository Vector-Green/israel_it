import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';

import { jwtConfig } from './jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return jwtConfig(configService);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
