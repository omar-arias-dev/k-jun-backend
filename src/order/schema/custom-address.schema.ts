import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class CustomAddress {
  @Prop({
    required: true,
  })
  customer_name: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  street_number: string;

  @Prop({
  })
  apartment_number?: string;

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
  })
  zip_code: string;
  
  @Prop({
    required: true,
  })
  country: string;
}

export const CustomAddressSchema = SchemaFactory.createForClass(CustomAddress);