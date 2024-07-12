import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './table.schema';
import { Order, OrderSchema } from 'src/order/order.schema';
import { TableHistory, TableHistorySchema } from 'src/table-history/table-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: TableHistory.name,
        schema: TableHistorySchema,
      },
    ]),
  ],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule {}
