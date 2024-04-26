import dotenv from 'dotenv';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schemas/asset.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PriceRecord, PriceRecordSchema } from './schemas/price-record.schema';
import { AppService } from './app.service';
import { AppController } from './app.controller';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017'),
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MongooseModule.forFeature([
      { name: PriceRecord.name, schema: PriceRecordSchema },
    ]),
    ClientsModule.register([
      {
        name: process.env.WS_ZIMZAM_NAME,
        transport: Transport.TCP,
        options: { port: Number(process.env.WS_ZIMZAM_MS_PORT) },
      },
    ]),
    ClientsModule.register([
      {
        name: process.env.PRICE_FETCHER_NAME,
        transport: Transport.TCP,
        options: { port: Number(process.env.PRICE_FETCHER_MS_PORT) },
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'zimzam-app'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
