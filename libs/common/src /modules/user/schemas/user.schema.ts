import { Document, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HistoryBaseEntity } from '../../../schemas/historyBase.schema';

@Schema({ _id: false })
export class UserEmailAddressEntity {
  @Prop()
  address: string;

  @Prop()
  verified: boolean;
}

export const UserEmailAddressSchema = SchemaFactory.createForClass(UserEmailAddressEntity);

@Schema({ _id: false })
export class UserTelephoneEntity {
  @Prop()
  type: string;

  @Prop()
  number: string;
}

export const UserTelephoneSchema = SchemaFactory.createForClass(UserTelephoneEntity);
export type UserDocument = UserEntity & Document;

@Schema({ timestamps: true })
export class UserEntity extends HistoryBaseEntity {
  @Prop()
  organisationActive: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  services: Record<string, any>;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [UserEmailAddressSchema] })
  emails: UserEmailAddressEntity[];

  @Prop()
  givenName: string;

  @Prop()
  surname: string;

  @Prop()
  gender: string;

  @Prop({ type: [UserTelephoneSchema] })
  telephones: UserTelephoneEntity[];

  @Prop()
  languages: string[];

  @Prop()
  avatarFileId: string;

  @Prop()
  indigenousStatus: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  permissions: Record<string, string[]>;

  avatar: string;

  featuredCircles: string[];

  @Prop({ type: Number })
  startOfWeek: number;

  @IsOptional()
  @Prop({ type: String })
  name: string;

  hasRoleInOrganisationId: (organisationId: string, role: string) => boolean;

  isMemberOfOrganisation: (organisationId: string) => boolean;

  getRolesIn: (organisationId: string) => string[];

  isMemberOfCircle: (circleId: string) => boolean;

  isPersonalMemberOfCircle: (circleId: string) => boolean;

  getActiveOrganisation: () => string;

  profile: any;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
