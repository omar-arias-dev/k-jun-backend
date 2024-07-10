import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
})
export class Address {
  @Prop({
    required: true,
  })
  street: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  state: string;

  @Prop({
    required: true,
    trim: true,
    length: 5,
  })
  zip_code: string;

  @Prop({
    required: true,
  })
  country: string;

  @Prop({
    required: true,
    default: true,
  })
  status: boolean;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Customer",
  })
  customer: mongoose.Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);