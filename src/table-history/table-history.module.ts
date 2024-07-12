import { Module } from '@nestjs/common';
import { TableHistoryService } from './table-history.service';
import { TableHistoryController } from './table-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableHistory, TableHistorySchema } from './table-history.schema';
import { Table, TableSchema } from 'src/table/table.schema';
import { Order, OrderSchema } from 'src/order/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TableHistory.name,
        schema: TableHistorySchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [TableHistoryService],
  controllers: [TableHistoryController]
})
export class TableHistoryModule {}
