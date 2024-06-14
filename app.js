const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api', userRouter);

// category 관련 api 라우팅
app.use('/api/categories', categoryRouter);

// product 관련 api 라우팅
app.use('/api/products', productRouter);

// order 관련 api 라우팅
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('에러');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행 중`));
