// 이 routers 폴더에서 만들어진 모듈들을 깔끔하게 묶어주는 역할을 index.js가 함.
// 나중에 import 할 때의 코드도 짧아지는 효과가 있음.

//export * from "./user-router";

// src/routers/index.js

import express from 'express';

const router = express.Router();

// 예시: /api/products 경로에 대한 GET 요청 처리
router.get('/api/products', (req, res) => {
  // 실제 로직 구현
  res.json({ message: 'Products route' });
});

// 다른 라우트들도 이어서 설정 가능

export default router;
