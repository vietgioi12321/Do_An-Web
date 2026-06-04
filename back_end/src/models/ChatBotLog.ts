import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../utils/autoIncrement';

interface ChatBotLog extends Document {
    chatBotLogId: number;
    chatBotName: string;
    version: string,
    userId: number,
    message: string,
    timestamp: Date,
}

const ChatBotLogSchema : Schema = new Schema({
    chatBotLogId: {type:Number, unique:true},
    chatBotName: {type:String,required:true},
    version: {type:String,required:true},
    userId: {type:Number,required:true},
    message: {type:String,required:true},
    timestamp: {type:Date,required:true}
})

ChatBotLogSchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.chatBotLogId = await getNextSequenceValue('chatBotLogId', 200);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<ChatBotLog>('ChatBotLog',ChatBotLogSchema);