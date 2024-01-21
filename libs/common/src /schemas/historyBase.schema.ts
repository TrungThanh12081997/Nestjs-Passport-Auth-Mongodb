// import { BaseEntity } from '@app/common/schemas/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { BaseEntity } from './base.schema';

export enum HistoryAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Schema()
export class HistoryEntity {
  @Prop()
  userId: string;

  @Prop()
  action: HistoryAction;

  @Prop()
  date: Date;

  @Prop({ type: MongooseSchema.Types.Mixed })
  previousData: Record<string, any>;

  @Prop()
  user?: string;

  @Prop()
  userAvatar?: string;

  // @Prop()
  // @IsOptional()
  // change?: {
  //   pin: {
  //     newValue: boolean;
  //   };
  //   title?: {
  //     newValue?: string;
  //     oldValue?: string;
  //   };
  //   roadmapId?: {
  //     newValue?: string;
  //     oldValue?: string;
  //   };
  //   text?: {
  //     newValue?: string;
  //     oldValue?: string;
  //   };
  //   documentTemplateFields?: {
  //     newValue?: any[];
  //     oldValue?: any[];
  //   };
  //   supportItems?: {
  //     newValue: {
  //       time?: number;
  //       quantity?: number;
  //       price?: number;
  //       total?: number;
  //     }[];
  //     oldValue: {
  //       price?: number;
  //       quantity?: number;
  //       time?: number;
  //       total?: number;
  //       _id?: string;
  //     }[];
  //   };
  // };
}

const HistorySchema = SchemaFactory.createForClass(HistoryEntity);

@Schema()
// extends BaseEntity
export class HistoryBaseEntity {
  @Prop({ type: [HistorySchema] })
  history?: HistoryEntity[];
}
