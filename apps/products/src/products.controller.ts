import { Controller, Get, Post, Body, Delete, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger/dist';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getAll() {
    return await this.productsService.getAllProducts();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.productsService.getOne(id);
  }

  @Post()
  async create(@Body() request: CreateProductDto) {
    return await this.productsService.createProduct(request);
  }

  @ApiParam({ name: 'id' })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() request: UpdateProductDto) {
    return await this.productsService.updateOne(id, request);
  }

  @ApiParam({ name: 'id' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.productsService.deleteOne(id);
  }
}
