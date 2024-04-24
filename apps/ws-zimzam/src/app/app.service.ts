import { Injectable } from '@nestjs/common';
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import { MessagePattern } from '@nestjs/microservices';
import { Server } from 'socket.io';
import { MicroServiceEvent, WebsocketBroadcastEvent } from '@app/events';

@Injectable()
@WebSocketGateway()
export class AppService {
  @WebSocketServer() wsServer: Server;

  @MessagePattern({ cmd: MicroServiceEvent.CMC_PRICE_UPDATE })
  onCmcPriceUpdate({ code, latestPrice }) {
    console.log('got latest price from message', { code, latestPrice });
    this.broadcastLatestPriceUpdate({ code, latestPrice });
    this.broadcastLatestPriceUpdateByCode({ code, latestPrice });
  }

  private broadcastLatestPriceUpdate({ code, latestPrice }) {
    this.wsServer.sockets.emit(WebsocketBroadcastEvent.ON_PRICE_UPDATE, {
      code,
      latestPrice,
    });
  }

  private broadcastLatestPriceUpdateByCode({ code, latestPrice }) {
    this.wsServer.sockets.emit(code, { code, latestPrice });
  }
}
