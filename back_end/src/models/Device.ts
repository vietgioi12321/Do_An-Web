import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../utils/autoIncrement';

interface Device extends Document {
    deviceId: number;
    name: string;
    osVersion: string,
    cpuCores: string,
    batteryLevel: string,
    networkSpeeds: number,
    totalApps: number
}

const DeviceSchema : Schema = new Schema({
    deviceId: {type: Number, unique:true},
    name: {type: String, required:true},
    osVersion: {type: String, required: true},
    cpuCores: {type: String, required: true},
    batteryLevel: {type: String, required: true},
    networkSpeeds: {type: Number, required: true},
    totalApps: {type: Number, required: true},
})

DeviceSchema.pre('save', async function (this: any) {
    if (!this.isNew) return;
    try {
      this.deviceId = await getNextSequenceValue('deviceId', 100);
    } catch (error: any) {
      throw error;
    }
});

export default mongoose.model<Device>('Device',DeviceSchema);