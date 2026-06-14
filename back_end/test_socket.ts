import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

socket.on("connect", async () => {
    console.log("Connected to Socket Server:", socket.id);
    
    socket.on("LOGENTRY_CHANGED", (data) => {
        console.log("RECEIVED LOGENTRY_CHANGED:", data);
        process.exit(0);
    });

    console.log("Sending test log entry...");
    try {
        await axios.post("http://localhost:5000/api/logEntry/add_logEntry", {
            name: "Test Socket Emit",
            logLevel: "ERROR",
            errorMessage: "Socket test",
            stackTrace: "at test.js",
            deviceUniqueId: "test_device_001",
            userId: 1,
            hardwareInfo: {
                cpu: { brand: "A", model: "B", cores: 4 },
                gpu: { brand: "C", memoryMB: 1024 },
                battery: { level: 100, isCharging: true },
                network: { type: "WIFI", isConnected: true, ipAddress: "1" },
                memory: { totalRAM: 8, totalROM: 128 }
            },
            timestamp: new Date()
        });
        console.log("Log sent successfully!");
    } catch (e) {
        console.error("Failed to send log:", e.message);
        process.exit(1);
    }
});

setTimeout(() => {
    console.log("Timeout waiting for event");
    process.exit(1);
}, 5000);
