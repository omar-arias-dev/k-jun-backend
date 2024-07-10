import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
  timestamps: true,
})
export class OrderHistory {
  @Prop({
    required: true,
  })
  note: string;
}

export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);