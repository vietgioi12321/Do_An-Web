import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../../utils/autoIncrement';

export interface User extends Document {
    userId: number;
    nameAccount: string;
    nameUser: string;
    email: string;
    password: string;
    address: string;
    phone: string,
    rules: number
}

const UserSchema: Schema = new Schema({
  userId: { type: Number, unique: true },
  nameAccount: { type: String, required: true, unique: true },
  nameUser: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  rules: {type: Number, required: true}
});

UserSchema.pre('save', async function (this: any) {
  if (!this.isNew) return;
  try {
    this.userId = await getNextSequenceValue('user_id', 1);
  } catch (error: any) {
    throw error;
  }
});

export default mongoose.model<User>('User', UserSchema);