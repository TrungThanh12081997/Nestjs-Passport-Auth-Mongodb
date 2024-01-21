import { Prop, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import randomId from '../modules/auth/utils/randomId';

@Schema()
export class BaseEntity {
  @Prop({ type: String, default: () => randomId() })
  @IsOptional()
  _id: string;

  // @Prop()
  // createdAt: Date;

  // @Prop()
  // updatedAt: Date;

  // @Prop()
  // lastModifiedBy: string;

  @Prop()
  name: string;

  // @Prop({ default: false })
  // disabled: boolean;
}
