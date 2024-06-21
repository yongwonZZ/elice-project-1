// Express 불러오기
import express from 'express';
import productRouter from './src/routers/product-router.js'; // 경로는 실제 파일 경로에 맞게 변경
const app = express();
const PORT = 3000; // 사용할 포트 번호


// 미들웨어 설정 (Body Parser 예시)
app.use(express.json()); // JSON 파싱을 위한 미들웨어 설정
app.use('/api', productRouter); // '/api' 경로에 productRouter를 사용

// 라우트 예시
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 작동 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 작동 중입니다.`);
});
