import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schemas/asset.schema';
import axios from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceEvent } from '@app/events';

const fetchLatestPriceByCode = async (code) => {
  const priceResponse = await axios.get(
    'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    {
      headers: {
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
      },
      params: {
        symbol: code,
      },
    }
  );

  return priceResponse.data[code]?.quote.USD.price;
};

@Injectable()
export class AppService {
  intervalId = undefined;

  constructor(
    @InjectModel(Asset.name) private assetModel: Model<Asset>,
    @Inject('Notifier') private client: ClientProxy
  ) {
    this.intervalId = setInterval(async () => {
      const assets = await this.assetModel.find();

      Promise.all(
        assets.map(async (asset) => {
          const latestPrice = await this.fetchLatestPrice(asset);
          console.log('fetched latest price', {
            code: asset.code,
            latestPrice,
          });
          this.sendLatestPriceUpdateMessage({
            code: asset.code,
            latestPrice,
          });

          console.log('sent latest price', { code: asset.code, latestPrice });
        })
      );
    }, 1000 * 15);
  }

  private sendLatestPriceUpdateMessage({ code, latestPrice }) {
    this.client.emit(MicroServiceEvent.CMC_PRICE_UPDATE, { code, latestPrice });
  }

  async fetchLatestPrice({ assetId, code }) {
    const latestPrice = await fetchLatestPriceByCode(code);

    this.assetModel.updateOne({ assetId, latestPrice });
  }

  async addCryptoCurrencyAsset(cryptoCurrencyCode: string) {
    const assetId = uuidv4();
    const createdCryptoCurrencyAsset = await this.assetModel.create({
      assetId,
      code: cryptoCurrencyCode,
    });

    return createdCryptoCurrencyAsset;
  }
}
