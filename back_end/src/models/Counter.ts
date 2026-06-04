import mongoose, {Document,Schema} from 'mongoose';

export interface ICounter extends Document {
  modelName: string; 
  seq: number;
}

const CounterSchema = new Schema({
  modelName: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

export const CounterModel = mongoose.model<ICounter>('Counter',CounterSchema);