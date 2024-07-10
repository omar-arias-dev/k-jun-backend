import {
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ItemDTO } from './item.dto';

export class AddItemsOrderDTO {
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  items: ItemDTO[];

  @IsNumber()
  @IsNotEmpty()
  order_total: number;
}