import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserGroupDocument = HydratedDocument<UserGroup>;

@Schema({ collection: 'user_group', timestamps: true })
class UserGroup {
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: String, unique: true, index: true })
  code: string;

  @Prop({ type: [String], default: [] })
  rights: string[];
}
const UserGroupSchema = SchemaFactory.createForClass(UserGroup);
UserGroupSchema.index(
  { name: 'text', code: 'text' },
  { default_language: 'none' },
);

export { UserGroup, UserGroupSchema };
