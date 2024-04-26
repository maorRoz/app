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
      from = '0',
      to = Date.now().toString(),
      page,
    }: { from?: string; to?: string; page?: string }
  ) {
    return this.appService.getPriceHistory({
      code,
      range: { from: Number(from), to: Number(to) },
      page: Number(page) ?? undefined,
    });
  }

  @Get('/latest-price')
  getAssetsWithLatestPrices(
    @Query() { code }: { code: string[] | string }
  ): Promise<
    {
      code: string;
      latestPrice?: number;
    }[]
  > {
    const codes = Array.isArray(code) ? [code].filter(Boolean) : code;
    return this.appService.getAssetsWithLatestPrices(codes);
  }

  @EventPattern(MicroServiceEvent.RECORD_LATEST_PRICE)
  async handleFetchPriceRequest({ assetId, code, latestPrice }) {
    await this.appService.recordPrice({ assetId, latestPrice });

    this.appService.emitBroadcastLatestPrice({ code, latestPrice });
  }
}
