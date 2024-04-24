import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schemas/asset.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017'),
    MongooseModule.forFeature(
      [{ name: Asset.name, schema: AssetSchema }]
    ),
    ClientsModule.register([
      { name: 'Notifier', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
