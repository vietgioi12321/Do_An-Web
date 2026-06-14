import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import User from './models/User';
import Device from './models/Device';
import LogEntry from './models/LogEntry';
import './models/Counter'; // Import để tránh lỗi Schema hasn't been registered for model "Counter"

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/local';

async function seedData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        if (users.length === 0) {
            console.log('No users found. Exiting.');
            process.exit(0);
        }

        // Tạo 1 thiết bị test nếu chưa có
        let device = await Device.findOne({});
        if (!device) {
            device = await Device.create({
                deviceUniqueId: 'test_device_001',
                device: {
                    brand: 'Samsung',
                    model: 'Galaxy S23',
                    OsVersion: 'Android 14'
                },
                cpu: { device: 'Snapdragon 8 Gen 2', cores: 8 },
                gpu: { brand: 'Adreno', memoryMB: 4096 },
                network: { macAddress: '00:11:22:33:44:55' },
                memory: { ramGB: 8, romGB: 256 },
                timestamp: new Date()
            });
            console.log('Created a test device.');
        }

        for (const user of users) {
            const today = new Date();
            
            for (let i = 0; i < 7; i++) {
                // Tạo ngày khác nhau để vẽ chart line
                const logDate = new Date(today);
                logDate.setDate(logDate.getDate() - i); 
                
                // Random số lượng log từ 1 đến 6 cho mỗi ngày để đường LineChart gập ghềnh
                const numLogs = Math.floor(Math.random() * 6) + 1;
                
                for (let j = 0; j < numLogs; j++) {
                    const isError = Math.random() > 0.4;
                    // Lệch giờ đi một chút trong ngày
                    const specificTime = new Date(logDate);
                    specificTime.setHours(Math.floor(Math.random() * 24));
                    specificTime.setMinutes(Math.floor(Math.random() * 60));

                    await LogEntry.create({
                        name: `Lỗi ngẫu nhiên ${j + 1} của user ${user.nameUser}`,
                        logLevel: isError ? 'Error' : 'Warning',
                        errorMessage: isError ? 'Timeout Exception' : 'High Memory Usage',
                        stackTrace: 'at com.example.app.fetchData(App.java:45)',
                        deviceUniqueId: device.deviceUniqueId,
                        userId: user.userId,
                        hardwareInfo: {
                            cpu: { brand: 'Qualcomm', model: 'Snapdragon', cores: 8 },
                            gpu: { brand: 'Adreno', memoryMB: 4096 },
                            battery: { level: Math.floor(Math.random() * 100), isCharging: false },
                            network: { type: 'WiFi', isConnected: true, ipAddress: '192.168.1.1' },
                            memory: { totalRAM: 8, totalROM: 256 }
                        },
                        timestamp: specificTime
                    });
                }
            }
            console.log(`Successfully added random logs for user ${user.nameUser} (ID: ${user.userId}) over 7 days`);
        }

        console.log('All random seed data inserted successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();
