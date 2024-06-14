import mongoose from 'mongoose';
import express from 'express';
import db from './index.js';

const app = express();
const port = 5000;


const DB_URL = process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.';

// MongoDB와 연결 설정
mongoose.connect("mongodb+srv://haeun:<password>@team02.vtarhps.mongodb.net/?retryWrites=true&w=majority&appName=team02", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB 연결 실패:', error);
});

db.once('open', () => {
  console.log('MongoDB에 연결되었습니다.');
});


connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));

export default db;
