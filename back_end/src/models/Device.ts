import mongoose, { Schema, Document } from 'mongoose';
import { getNextSequenceValue } from '../../utils/autoIncrement';

// 1. Định nghĩa Interface cho TypeScript tương thích với React Native
export interface IDevice extends Document {
    deviceId: number; // ID tự tăng dùng cho đồ án
    // ĐÂY CHÍNH LÀ CHIẾC CHÌA KHÓA VÀNG
    deviceUniqueId: string,
    
    device: {
      brand: string;
      model: string;
      OsVersion: string;
    };
    
    cpu: {
      device: string;
      cores: number;
    };
    
    gpu: {
      brand: string;
      memoryMB: number;
    };
    
    network: {
      macAddress: string;
    };

    memory: {
      ramGB: number;
      romGB: number;
    };

    timestamp: Date;
}

// 2. Định nghĩa Mongoose Schema (Cấu trúc bảng dưới Database)
const DeviceSchema: Schema = new Schema(
  {
    deviceId: { type: Number, unique: true },
    deviceUniqueId: { type: String, required: true, unique: true },
    
    device: {
      brand: { type: String, required: true, default: 'Unknown' },
      model: { type: String, required: true, default: 'Unknown' },
      osVersion: { type: String, required: true }
    },
    
    cpu: {
      device: { type: String, default: 'Unknown' },
      cores: { type: Number, default: 0 } // Đổi từ String sang Number cho đúng bản chất số lõi
    },
    
    gpu: {
      brand: { type: String, default: 'Unknown' },
      memoryMB: { type: Number, default: 0 }
    },
    
    network: {
      macAddress: { type: String, default: '02:00:00:00:00:00' }
    },
    
    memory: {
      ramGB: { type: Number, required: true }, // Ép kiểu Number để sau này tính toán/đo lường
      romGB: { type: Number, required: true }
    },
    
    timestamp: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Tự động thêm ngày tạo (createdAt) và ngày cập nhật (updatedAt)
  }
);

DeviceSchema.pre('save', async function (this: any) {

  if (!this.isNew) return;
  try {
    this.deviceId = await getNextSequenceValue('deviceId', 100);
  } catch (error: any) {
    throw error;
  }
});

export default mongoose.model<IDevice>('Device', DeviceSchema);