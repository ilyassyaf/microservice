import { RmqService } from "@app/common";
import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { ProductsGateway } from "./products.gateway";

@Controller()
export class ProductsController {
    constructor(
        private readonly rmqService: RmqService,
        private readonly productsGateway: ProductsGateway
    ) { }

    @EventPattern('product_created')
    async handleProductCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        this.productsGateway.server.emit('product_created', data);
        
        this.rmqService.ack(context);
    }

    @EventPattern('product_updated')
    async handleProductUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
        this.productsGateway.server.emit('product_updated', data);
        
        this.rmqService.ack(context);
    }

    @EventPattern('product_deleted')
    async handleProductDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
        this.productsGateway.server.emit('product_deleted', data);
        
        this.rmqService.ack(context);
    }
}