import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Asset {
  @Prop({ required: true })
  assetId: string;

  @Prop({ required: true })
  code: string;
}

export type AssetDocument = HydratedDocument<Asset>;
export const AssetSchema = SchemaFactory.createForClass(Asset);
