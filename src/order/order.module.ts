import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';
import { Address, AddressSchema } from 'src/address/address.schema';
import { Product, ProductSchema } from 'src/product/product.schema';
import { Counter, CounterSchema } from 'src/counter/couter.schema';
import { CounterService } from 'src/counter/counter.service';
import { OrderHistory, OrderHistorySchema } from './schema/order-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Address.name,
        schema: AddressSchema,
      },
      {
        name: Counter.name,
        schema: CounterSchema,
      },
      {
        name: OrderHistory.name,
        schema: OrderHistorySchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CounterService],
})
export class OrderModule {}
