import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { MicroServiceEvent } from '@app/events';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(MicroServiceEvent.FETCH_PRICE_REQUEST)
  async handleFetchPriceRequest({ assetId, code }) {
    const latestPrice = await this.appService.fetchLatestPriceByCode(code);

    this.appService.emitRecordPriceEvent({ assetId, code, latestPrice });
  }
}
