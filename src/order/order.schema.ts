import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Item, ItemSchema } from "./schema/item.schema";
import { CustomAddress, CustomAddressSchema } from "./schema/custom-address.schema";
import { Status, Type, PaymentMethod } from "src/enum/order-enum";
import { OrderHistory, OrderHistorySchema } from "./schema/order-history.schema";

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    type: [ItemSchema],
    required: true,
  })
  items: Item[];

  @Prop({
    required: true,
  })
  total: number;
  
  @Prop({
    type: String,
    enum: Type,
    required: true,
  })
  type: Type;
  
  @Prop({
    type: String,
    enum: Status,
    required: true,
  })
  status: Status;
  
  @Prop({
    type: String,
    enum: PaymentMethod,
    required: true,
  })
  payment_method: PaymentMethod;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  })
  customer?: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Address",
    required: function() { return this.customer ? true : false },
  })
  address?: mongoose.Types.ObjectId;

  @Prop({
    type: CustomAddressSchema,
    required: function() { return ((!this.customer || !this.address) && (this.type === Type.TAKE_OUT)) ? true : false  },
  })
  custom_address?: CustomAddress;

  @Prop({
    type: [OrderHistorySchema],
    required: true,
    default: [],
  })
  history: OrderHistory[];
  
  @Prop({
    required: true,
  })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);