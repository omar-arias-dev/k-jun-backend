import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  _id: false,
})
export class Item {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  product: mongoose.Types.ObjectId;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  quantity: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);