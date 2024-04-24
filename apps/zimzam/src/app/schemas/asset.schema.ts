import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
  @Prop({ required: true })
  assetId: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  latestPrice?: number;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
