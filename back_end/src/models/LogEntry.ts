import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../utils/autoIncrement';

interface HardwareInfo{
    cpu: {brand:string, model:string, cores:number},
    gpu:{brand:string, memoryMB:number},
    battery: {level:number, isCharging:boolean},
    network: {type:string, isConnected:boolean, ipAddress:string},
    memory: {totalRAM:number, totalROM:number}
}

interface LogEntry extends Document {
    logEntryId: number;
    name: string;
    logLevel: string,
    errorMessage: string,
    stackTrace: string,
    deviceId: number,
    userId: number,
    hardwareInfo: HardwareInfo,
    timestamp: Date
}

const HardwareInfoSchema : Schema = new Schema({
    cpu: {   
        brand:{type:String, required:true},
        model:{type:String, required:true},
        cores:{type:Number, required:true}
    },
    gpu:{
        brand:{type:String, required:true},
        memoryMB:{type:Number, required:true}
    },
    battery: {
        level:{type:Number, required:true},
        isCharging:{type:Boolean, required:true}
    },
    network:{
        type:{type:String, required:true},
        isConnected:{type:Boolean, required:true},
        ipAddress:{type:String, required:true}
    },
    memory:{
        totalRAM:{type:Number, required:true},
        totalROM:{type:Number, required:true}
    }
})

const LogEntrySchema : Schema = new Schema({
    logEntryId: {type:Number,unique:true},
    name: {type:String,required:true},
    logLevel: {type:String,required:true},
    errorMessage: {type:String,required:true},
    stackTrace: {type:String,required:true},
    deviceId: {type:Number,required:true},
    userId: {type:Number,required:true},
    hardwareInfo: {type:HardwareInfoSchema,required:true},
    timestamp: {type:Date, required:true, unique:true, default: Date.now}
})

LogEntrySchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.logEntryId = await getNextSequenceValue('logEntryId', 300);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<LogEntry>('LogEntry',LogEntrySchema);