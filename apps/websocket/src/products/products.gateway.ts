import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { ProductsService } from './products.service';
import { Server } from "socket.io";
import { RmqService } from '@app/common';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ProductsGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly productsService: ProductsService, private readonly rmqService: RmqService) {}
}
