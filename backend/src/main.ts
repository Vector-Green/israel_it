import { NestFactory } from '@nestjs/core';
import path from 'path';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import fastifyStatic from '@fastify/static';

import { NotFoundExceptionFilter } from './not.foundexception';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.register(fastifyStatic, {
    root: path.resolve(process.cwd(), '../static'),
    preCompressed: true,
  });

  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.enableCors();

  console.log(
    'Static preCompressed files path: ' +
      path.resolve(process.cwd(), '../static'),
  );

  await app.listen(3000, '0.0.0.0');
}

start();
