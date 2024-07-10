import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Address.name,
        schema: AddressSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      }
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
