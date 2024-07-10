import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  phone: string;

  @Prop({
    unique: true,
    trim: true,
    required: false,
  })
  email?: string;

  @Prop({
    required: true,
    default: true,
  })
  status: boolean;

/*   @Prop({
    type: [mongoose.Types.ObjectId],
    ref: "Address",
  })
  address?: mongoose.Types.ObjectId[]; */
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);