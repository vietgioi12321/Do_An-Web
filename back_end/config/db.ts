import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Kích hoạt đọc file .env
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGO_URI;
    
    if (!connStr) {
      throw new Error('Chưa cấu hình MONGO_URI trong file .env');
    }

    // Tiến hành kết nối
    const conn = await mongoose.connect(connStr);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    // Thoát chương trình nếu kết nối thất bại để tránh lỗi dây chuyền
    process.exit(1); 
  }
};

export default connectDB;