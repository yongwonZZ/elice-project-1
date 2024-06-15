const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRouter = require('./src/routers');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('서버 오류');
});

app.get('/', (req, res) => {
  res.send('API RUNNING...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행 중`));
