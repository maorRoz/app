import dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AppController } from './app.controller';

dotenv.config();

@Module({
  imports:[
    ClientsModule.register([
      {
        name: process.env.ZIMZAM_NAME,
        transport: Transport.TCP,
        options: { port: Number(process.env.ZIMZAM_MS_PORT) },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
