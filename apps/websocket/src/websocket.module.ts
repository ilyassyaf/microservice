import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import * as Joi from "joi";
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_WEBSOCKET_QUEUE: Joi.string().required(),
      PORT: Joi.string().required()
    })
  }), RmqModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class WebsocketModule {}
