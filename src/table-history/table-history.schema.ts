import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class TableHistory {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Table",
    required: true,
  })
  table: mongoose.Types.ObjectId;
  
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true,
  })
  order: mongoose.Types.ObjectId;

  @Prop({
    required: true,
  })
  table_number: string;

  @Prop({
    required: true,
  })
  note: string;
}

export const TableHistorySchema = SchemaFactory.createForClass(TableHistory);