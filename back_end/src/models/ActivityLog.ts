import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../utils/autoIncrement';

interface ActivityLog extends Document {
    activityLogId: number;
    actionName: string;
    details: string,
    userId: number,
    timestamp: Date,
}

const ActivityLogSchema : Schema = new Schema({
    activityLogId: {type:Number, unique:true},
    actionName: {type:String,required:true},
    details: {type:String,required:true},
    userId: {type:Number,required:true},
    timestamp: {type:Date,required:true}
})

ActivityLogSchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.activityLogId = await getNextSequenceValue('activityLogId', 500);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<ActivityLog>('ActivityLog',ActivityLogSchema);