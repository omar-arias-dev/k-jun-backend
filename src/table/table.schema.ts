import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TableStatus } from "src/enum/table-enum";

@Schema({
  timestamps: false,
})
export class Table {
  @Prop({
    type: String,
    enum: TableStatus,
    required: true,
    default: TableStatus.AVAILABLE,
  })
  available: TableStatus;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: function () { return this.available === TableStatus.TAKEN },
  })
  current_order?: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  table_number: string;

  @Prop({
    type: Number,
    required: true,
  })
  capacity: number;

  @Prop({
    type: String,
    default: "",
    required: true,
  })
  notes: string;

  @Prop({
    required: true,
    default: true,
  })
  status: boolean;
}

export const TableSchema = SchemaFactory.createForClass(Table);