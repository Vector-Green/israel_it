import { Module } from '@nestjs/common';
import { RandomDataController } from './random-data.controller';
import { RandomDataService } from './random-data.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [RandomDataController],
  providers: [RandomDataService, AuthService, JwtService, ConfigService],
})
export class RandomDataModule {}
