import dotenv from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schemas/asset.schema';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceEvent } from '@app/events';
import { PriceRecord } from './schemas/price-record.schema';

dotenv.config();

const MAX_ENTRIES_PER_PAGE = 5;

@Injectable()
export class AppService {
  intervalId = undefined;

  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
    @InjectModel(PriceRecord.name) private priceRecordModel: Model<PriceRecord>,
    @Inject(process.env.WS_ZIMZAM_NAME) private wsClient: ClientProxy,
    @Inject(process.env.PRICE_FETCHER_NAME)
    private priceFetcherClient: ClientProxy
  ) {
    this.intervalId = setInterval(async () => {
      const assets = await this.assetModel.find();

      Promise.all(
        assets.map(async (asset) =>
          this.priceFetcherClient.emit(MicroServiceEvent.FETCH_PRICE_REQUEST, {
            assetId: asset.assetId,
            code: asset.code,
          })
        )
      );
    }, 1000 * 15);
  }

  emitBroadcastLatestPrice({ code, latestPrice }) {
    this.wsClient.emit(MicroServiceEvent.BROADCAST_LATEST_PRICE, {
      code,
      latestPrice,
    });
  }

  async addCryptoCurrencyAsset(cryptoCurrencyCode: string) {
    const assetId = uuidv4();
    const createdCryptoCurrencyAsset = await this.assetModel.create({
      assetId,
      code: cryptoCurrencyCode,
    });

    return createdCryptoCurrencyAsset;
  }

  async recordPrice({ assetId, latestPrice }) {
    await this.priceRecordModel.create({
      assetId,
      price: latestPrice,
      time: Date.now(),
    });
  }

  async getPriceHistory({ code, range, page }) {
    const { assetId } = await this.assetModel.findOne({ code });

    return this.priceRecordModel.find(
      {
        assetId,
        time: { $gte: range.to, $lte: range.from },
      },
      null,
      page || page === 0
        ? {
            limit: MAX_ENTRIES_PER_PAGE,
            skip: page * MAX_ENTRIES_PER_PAGE,
            sort: { time: 'desc' },
          }
        : {}
    );
  }

  async getAssetsWithLatestPrices(codes): Promise<
    {
      code: string;
      latestPrice?: number;
    }[]
  > {
    const assets = await this.assetModel.find({ code: { $in: codes } });

    return Promise.all(
      assets.map(async (asset) => {
        const [latestPriceRecord] = await this.priceRecordModel
          .find({ assetId: asset.assetId })
          .sort({ time: 'desc' });

        return {
          code: asset.code,
          price: latestPriceRecord?.price,
        };
      })
    );
  }
}
