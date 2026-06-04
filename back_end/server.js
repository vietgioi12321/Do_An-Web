const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Cấu hình Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint nhận tin nhắn test
app.post('/test-hello', (req, res) => {
    console.clear();
    console.log('\n' + '='.repeat(30));
    console.log('📩 Received payload:', JSON.stringify(req.body, null, 2));
    console.log('='.repeat(30) + '\n');
    res.status(200).json({ status: 'Node.js Server received your message!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server Node.js đang chạy tại http://localhost:${PORT}`);
    console.log(`👉 Hãy dùng IP máy tính của bạn để App Expo kết nối nhé!`);
});