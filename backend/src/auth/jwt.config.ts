import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => {
  return {
    secret: configService.get<string>('SECRET'),
    signOptions: { expiresIn: '12h', algorithm: 'HS256' },
  };
};
