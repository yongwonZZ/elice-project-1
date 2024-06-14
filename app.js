import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('에러');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행 중`));
