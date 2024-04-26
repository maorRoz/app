/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const port = Number(process.env.PRICE_FETCHER_MS_PORT)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    }
  );

  await app.listen();
  Logger.log(
    `🚀 price-fetcher microservice is running on: http://localhost:${port}`
  );
}

bootstrap();
