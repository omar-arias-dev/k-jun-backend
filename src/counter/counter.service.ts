import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './couter.schema';

@Injectable()
export class CounterService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const sequenceDocument = await this.counterModel.findOneAndUpdate(
      { collectionName: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return sequenceDocument.seq;
  }
}