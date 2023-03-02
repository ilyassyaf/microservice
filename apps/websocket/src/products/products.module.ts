import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsGateway } from './products.gateway';
import { RmqModule } from '@app/common';
import { ProductsController } from './products.controller';

@Module({
  imports: [RmqModule],
  providers: [ProductsGateway, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
