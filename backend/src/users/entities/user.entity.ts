import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
// export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
})
export class User {
  id: string;
  @Prop()
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ type: String, default: null })
  profile: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
