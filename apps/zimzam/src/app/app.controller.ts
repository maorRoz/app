import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MicroServiceEvent } from '@app/events';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addCryptoCurrencyAsset(@Body() { code }: { code: string }) {
    return this.appService.addCryptoCurrencyAsset(code);
  }

  @Get('/:code/prices-history')
  getPricesHistory(
    @Param('code') code: string,
    @Query()
    {
      from = (Date.now() - 1000 * 60).toString(),
      to = Date.now().toString(),
    }: { from?: string; to?: string }
  ) {
    return this.appService.getPriceHistory({
      code,
      range: { from: Number(from), to: Number(to) },
    });
  }

  @Get('/latest-price')
  getAssetsWithLatestPrices(
    @Query() { code }: { code: string[] | string }
  ): Promise<
    {
      code: string;
      priceRecords: number[];
    }[]
  > {
    const codes = Array.isArray(code) ? code : [code].filter(Boolean);
    return this.appService.getAssetsWithLatestPrices(codes);
  }

  @EventPattern(MicroServiceEvent.RECORD_LATEST_PRICE)
  async handleFetchPriceRequest({ assetId, code, latestPrice }) {
    await this.appService.recordPrice({ assetId, latestPrice });

    this.appService.emitBroadcastLatestPrice({ code, latestPrice });
  }
}
