import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../../utils/autoIncrement';

interface Sussgesion extends Document {
    sussgesionId: number;
    name: string;
    title: string,
    causeAnalysis: string,
    solutionSteps: string,
    isApplied: number,
    relatedLogId: number,
    chatBotId: number
}

const SussgesionSchema : Schema = new Schema({
    sussgesionId: {type: Number, unique:true},
    name: {type:String,required:true},
    title: {type:String,required:true},
    causeAnalysis: {type:String,required:true},
    solutionSteps: {type:String,required:true},
    isApplied: {type:Number,required:true},
    relatedLogId: {type:Number,required:true},
    chatBotId: {type:Number,required:true}
})

SussgesionSchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.sussgesionId = await getNextSequenceValue('sussgesionId', 400);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<Sussgesion>('Sussgesion',SussgesionSchema);