import { Controller, Get } from '@nestjs/common';
import { PaymentMethod, Status, Type } from './order-enum';
import { ApiTags } from '@nestjs/swagger';
import { TableStatus } from './table-enum';

@ApiTags("Enums")
@Controller('enum')
export class EnumController {

  @Get("types")
  getTypes() {
    return Object.values(Type);
  }

  @Get("status")
  getStatus() {
    return Object.values(Status);
  }

  @Get("payment-methods")
  gePaymentMethods() {
    return Object.values(PaymentMethod);
  }

  @Get("table-status")
  getTableStatus() {
    return Object.values(TableStatus);
  }
}
