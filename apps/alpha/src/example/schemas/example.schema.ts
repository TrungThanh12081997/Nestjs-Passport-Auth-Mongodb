import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HistoryBaseEntity } from '../../../../../libs/common/src /schemas/historyBase.schema';

@Schema({ timestamps: true })
export class Example extends HistoryBaseEntity {
  @Prop({ required: true })
  name: string;
}
export type ExampleDocument = Example & Document;
export const ExampleSchema = SchemaFactory.createForClass(Example);
