import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@ApiTags("Products")
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  findOneProduct(@Param("id") id: string) {
    return this.productService.findOneProductById(id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDTO) {
    return this.productService.createProduct(body);
  }

  @Delete(':id')
  suspendProductById(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProductById(
    @Param("id") id: string,
    @Body() body: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(id, body);
  }
}
