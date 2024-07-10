import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import mongoose from 'mongoose';

export class ItemDTO {
  @IsNotEmpty()
  product: mongoose.Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  price: number;
  
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}