import { Injectable, Inject } from '@nestjs/common';
import { WEBSOCKET_SERVICE } from './constants/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository, @Inject(WEBSOCKET_SERVICE) private websocketClient: ClientProxy) { }

  async createProduct(request: CreateProductDto) {
    const session = await this.productsRepository.startTransaction();

    try {
      const product = await this.productsRepository.create(request);
      await lastValueFrom(
        this.websocketClient.emit('product_created', product)
      )
      await session.commitTransaction();
      return product;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getAllProducts() {
    return this.productsRepository.find({});
  }

  async getOne(_id: string) {
    return this.productsRepository.findOne({ _id });
  }

  async updateOne(_id: string, data: UpdateProductDto) {
    const session = await this.productsRepository.startTransaction();

    try {
      const product = await this.productsRepository.findOneAndUpdate({ _id }, data);
      await lastValueFrom(
        this.websocketClient.emit('product_updated', product)
      )
      await session.commitTransaction();
      return product;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteOne(_id: string) {
    const session = await this.productsRepository.startTransaction();

    try {
      const product = await this.productsRepository.delete({ _id });
      await lastValueFrom(
        this.websocketClient.emit('product_deleted', product)
      )
      await session.commitTransaction();
      return product;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
