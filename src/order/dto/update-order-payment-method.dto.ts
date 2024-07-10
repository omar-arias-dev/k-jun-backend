import { IsEnum, IsNotEmpty } from "class-validator";
import { PaymentMethod } from "src/enum/order-enum";


export class UpdateOrderPaymentMethodDTO {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;
}