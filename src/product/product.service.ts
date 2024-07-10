import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from "./product.schema";
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAllProducts() {
    return this.productModel.find({ status: true });
  }

  async createProduct(product: CreateProductDTO) {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findOneProductById(id: string) {
    const product = this.productModel.findById(id);
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.findOneProductById(id);
    product.status = false;
    return product.save();
  }

  async updateProduct(id: string, body: UpdateProductDTO) {
    const product = await this.productModel.findByIdAndUpdate(id, body, { new: true });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    return product;
  }
}
