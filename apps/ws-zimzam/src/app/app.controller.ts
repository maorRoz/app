import { MicroServiceEvent } from '@app/events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppGateway } from './app.gateway';

@Controller()
export class AppController {
  constructor(private readonly appGateway: AppGateway) {}

  @EventPattern(MicroServiceEvent.BROADCAST_LATEST_PRICE)
  onCmcPriceUpdate({ code, latestPrice }) {
    this.appGateway.broadcastLatestPriceUpdate({ code, latestPrice });
    this.appGateway.broadcastLatestPriceUpdateByCode({ code, latestPrice });
  }
}
