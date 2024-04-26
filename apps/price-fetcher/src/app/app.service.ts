import dotenv from 'dotenv';
import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceEvent } from '@app/events';

dotenv.config();

const fetchLatestPriceByCodeRequest = (code) =>
  axios.get(
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

@Injectable()
export class AppService {
  constructor(@Inject(process.env.ZIMZAM_NAME) private client: ClientProxy) {}
  async fetchLatestPriceByCode(code) {
    const { data: priceResponse } = await fetchLatestPriceByCodeRequest(code);

    return priceResponse.data[code]?.quote.USD.price;
  }

  async emitRecordPriceEvent({ assetId, code, latestPrice }) {
    this.client.emit(MicroServiceEvent.RECORD_LATEST_PRICE, {
      assetId,
      code,
      latestPrice,
    });
  }
}
