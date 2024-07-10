import { IsEnum, IsNotEmpty } from "class-validator";
import { Type } from "src/enum/order-enum";


export class UpdateOrderTypeDTO {
  @IsEnum(Type)
  @IsNotEmpty()
  type: Type;
}