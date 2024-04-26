import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
