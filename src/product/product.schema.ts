import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Product {

  //@Prop()
  //sku: string; //Buscar forma de crear kjn0001 || tienda0001

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  quantity: number;

  @Prop({
    required: true,
    trim: true,
  })
  category: string;

  @Prop()
  image: string;

  @Prop({
    required: true,
  })
  tags: string[];

  @Prop({
    required: true,
    default: true,
  })
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);