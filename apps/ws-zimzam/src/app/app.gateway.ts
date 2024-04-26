import dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketBroadcastEvent } from '@app/events';

dotenv.config();

@Injectable()
@WebSocketGateway(Number(process.env.WS_ZIMZAM_WS_PORT), { cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  broadcastLatestPriceUpdate({ code, latestPrice }) {
    this.server.sockets.emit(WebsocketBroadcastEvent.ON_PRICE_UPDATE, {
      code,
      latestPrice,
    });
  }

  broadcastLatestPriceUpdateByCode({ code, latestPrice }) {
    this.server.sockets.emit(code, latestPrice);
  }
}
