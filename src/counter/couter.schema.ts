import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  collectionName: string;

  @Prop({ required: true, default: 0 })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);