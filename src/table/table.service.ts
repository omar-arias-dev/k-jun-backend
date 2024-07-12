import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.schema';
import mongoose, { Model } from 'mongoose';
import { CreateTableDTO } from './dto/create-table.dto';
import { UpdateTableToTakenDTO } from './dto/update-table-to-taken.dto';
import { UpdateTableToAvailableDTO } from './dto/update-table-to-available.dto';
import { Order } from 'src/order/order.schema';
import { Type } from 'src/enum/order-enum';
import { TableStatus } from 'src/enum/table-enum';
import { TableHistory } from 'src/table-history/table-history.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(TableHistory.name) private tableHistoryModel: Model<TableHistory>,
  ) {}

  async createTable(createTableDto: CreateTableDTO) {
    const addedTable = new this.tableModel(createTableDto);
    const savedTable = await addedTable.save();
    if (!savedTable) return new InternalServerErrorException("Table couldn't be saved.");
    return savedTable;
  }

  async getAllTables() {
    return this.tableModel.find({ status: true })
      .lean()
      .populate("current_order")
      .exec();
  }

  async getTableById(id: string) {
    const table = this.tableModel.findById(id)
      .lean()
      .populate({
        path: "current_order",
        populate: {
          path: "items.product",
          model: 'Product',
        }
      });
    if (!table) return new NotFoundException("Table not Found.");
    return table;
  }

  async suspendTable(id: string) {
    const suspendedTable = this.tableModel.findByIdAndUpdate(id, { status: false }, { new: true });
    if (!suspendedTable) return new NotFoundException("Table not Found.");
    return suspendedTable;
  }

  async updateTableToTaken(
    id: string,
    updateTableToTakenDto: UpdateTableToTakenDTO,
  ) {
    if (updateTableToTakenDto.available !== TableStatus.TAKEN) return new ConflictException("Table need to be updated with status TAKEN");
    const table = await this.tableModel.findById(id);
    if (!table) return new NotFoundException("Table not Found.");
    if (table.available === TableStatus.TAKEN && table?.current_order) return new ConflictException("Table is already taken.");
    const order = await this.orderModel.findById(updateTableToTakenDto.current_order);
    if (!order) return new NotFoundException("Order not Found.");
    if (order.type !== Type.DINE_HERE) return new ConflictException("Order was not created with type DINE HERE");
    table.available = updateTableToTakenDto.available;
    table.current_order = new mongoose.Types.ObjectId(updateTableToTakenDto.current_order);
    const savedTable = await table.save();
    if (!savedTable) return new InternalServerErrorException("Table couldn't be saved");
    const tableHistory = new this.tableHistoryModel({
      table: savedTable._id,
      order: savedTable.current_order,
      table_number: savedTable.table_number,
      note: `Table ${savedTable.table_number} is taken with order.`,
    });
    const historySaved = await tableHistory.save();
    if (!historySaved) return new InternalServerErrorException("Table was saved. History couldn't be saved");
    return savedTable;
  }

  async updateTableToAvailable(
    id: string,
    updateTableToAvailableDto: UpdateTableToAvailableDTO,
  ) {
    if (updateTableToAvailableDto.available !== TableStatus.AVAILABLE) return new ConflictException("Table need to be updated with status AVAILABLE");
    const table = await this.tableModel.findById(id);
    if (table.available === TableStatus.AVAILABLE && !table?.current_order) return new ConflictException("Table is already available.");
    const order = await this.orderModel.findById(table.current_order);
    if (!order) return new NotFoundException("Order not Found.");
    table.set("available", updateTableToAvailableDto.available);
    table.set("current_order", undefined, { strict: false, });
    const updatedTable = table.save();
    if (!updatedTable) return new InternalServerErrorException("table couldn't be saved");
    return updatedTable;
  }
}
