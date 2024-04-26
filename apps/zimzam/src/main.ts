/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import dotenv from 'dotenv';

const MICRO_SERVICE_PORT = 4200;

async function bootstrap() {
  dotenv.config();

  const port = process.env.PORT || 3000;
  const msPort = Number(process.env.ZIMZAM_MS_PORT);

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: MICRO_SERVICE_PORT,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 zimzam is running on: http://localhost:${port}`);
  Logger.log(
    `🚀 zimzam microservice is running on: http://localhost:${msPort}`
  );
}

bootstrap();
