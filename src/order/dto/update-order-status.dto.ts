import { IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "src/enum/order-enum";


export class UpdateOrderStatusDTO {
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}