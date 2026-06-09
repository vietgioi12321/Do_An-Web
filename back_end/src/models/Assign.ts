import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../../utils/autoIncrement';

interface Assign extends Document {
    assignId: number;
    status: number;
    action: number,
    userId: number,
    logEntryId: number,
}

const AssignSchema : Schema = new Schema({
    assignId: {type:Number, unique:true},
    status: {type:Number,required:true},
    action: {type:Number,required:true},
    userId: {type:Number,required:true},
    logEntryId: {type:Number,required:true}
})

AssignSchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.assignId = await getNextSequenceValue('assignId', 600);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<Assign>('Assign',AssignSchema);