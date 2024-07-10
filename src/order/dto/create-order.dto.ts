import mongoose from 'mongoose';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  ValidateNested,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PaymentMethod, Status, Type } from 'src/enum/order-enum';
import { ItemDTO } from './item.dto';
import { CustomAddressDTO } from './custom-address.dto';

export class CreateOrderDTO {

  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  items: ItemDTO[];

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsEnum(Type)
  @IsNotEmpty()
  type: Type;
  
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
  
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @IsOptional()
  @IsNotEmpty()
  customer?: mongoose.Types.ObjectId;

  @IsOptional()
  @IsNotEmpty()
  address?: mongoose.Types.ObjectId;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsOptional()
  custom_address?: CustomAddressDTO;

  @IsString()
  note: string;
}