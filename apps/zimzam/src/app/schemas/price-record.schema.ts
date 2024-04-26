import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class PriceRecord {
  @Prop({ required: true })
  assetId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  time: number;
}

export type PriceRecordDocument = HydratedDocument<PriceRecord>;
export const PriceRecordSchema = SchemaFactory.createForClass(PriceRecord);
