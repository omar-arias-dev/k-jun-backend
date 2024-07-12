import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { EnumModule } from './enum/enum.module';
import { TableModule } from './table/table.module';
import { TableHistoryModule } from './table-history/table-history.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".dev.env",
      isGlobal: true,
      load: [
        configuration,
      ],
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/`, {
      dbName: process.env.DATABASE_NAME,
    }),
    ProductModule,
    OrderModule,
    CustomerModule,
    AddressModule,
    EnumModule,
    TableModule,
    TableHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
