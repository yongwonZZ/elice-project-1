import cors from 'cors';
import express from 'express';
import {
  userRouter,
  orderRouter,
  productRouter,
  categoryRouter,
} from './routers/index.js';
// import { viewsRouter } from './routers/views-router.js';
import { errorHandler } from './middlewares/index.js';
import morgan from 'morgan';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 현재 모듈의 디렉토리 경로를 가져오는 함수
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS 에러 방지
app.use(cors());

//morgan dev사용
app.use(morgan('dev'));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// // Static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
 res.redirect('/main')
});

// // Routes
app.get("/main", (req, res) => {
//   // ---- 이후 public 디렉토리 하위 각 폴더별로 라우터 변경
  res.sendFile(path.join(__dirname, "public/main", "main.html")); // 브랜치 병합 이후 여러분들 폴더를 public폴더로 옮겨야함
});

// // *********** User Page 관련 ***************
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Sign", "signup.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Sign", "signin.html"));
});
app.get("/mypage", (req, res) => {
  res.sendFile(path.join(__dirname, "public/myPage", "myPage.html"));
});

//back
app.get('/api', (req, res) => {
  res.send('API RUNNING...');
});

// html, css, js 라우팅
// app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
