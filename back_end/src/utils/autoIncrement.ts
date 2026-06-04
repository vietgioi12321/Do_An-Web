import mongoose from 'mongoose';
import { ICounter } from '../models/Counter';

/**
 * Hàm lấy số tăng dần tiếp theo cho một Collection cụ thể
 * @param modelName Tên định danh bộ đếm (Ví dụ: 'user_id', 'log_id')
 * @param startSeq Số bắt đầu mong muốn (Mặc định bắt đầu chạy từ 1)
 */
export async function getNextSequenceValue(modelName: string, startSeq: number = 1): Promise<number> {
  // Lấy trực thể model Counter đã được đăng ký với Mongoose
  const Counter = mongoose.model<ICounter>('Counter');

  const counter = await Counter.findOneAndUpdate(
    { modelName: modelName },
    { $inc: { seq: 1 } }, // Tăng số hiện tại lên 1 đơn vị
    { 
      new: true,          // Trả về bản ghi sau khi đã tăng số
      upsert: true,       // Nếu chưa có cấu hình cho bảng này thì tự động tạo mới
      setOnInsert: { seq: startSeq - 1 } // Thiết lập số gốc ban đầu nếu là tạo mới
    }
  );

  if (!counter) {
    throw new Error(`Không thể khởi tạo bộ đếm cho ${modelName}`);
  }

  return counter.seq;
}