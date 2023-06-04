import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomDataModule } from './random-data/random-data.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.secret',
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: 'redis',
          // url: '127.0.0.1:6379',
        },
      }),
    }),
    RandomDataModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
