const express = require('express');
const permission = require('../middlewares/permission');
const userRouter = require('../routers/userRouter');
const { signup, login, logout } = require('../services/userService');
const orderRouter = require('../routers/orderRouter');
const router = express.Router();

// 로그인&아웃, 회원 가입
router.post('/signup', signup); // 회원가입
router.post('/login', login); // 로그인
router.delete('/logout', logout); // 로그아웃

// 각 라우터 연결
router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/orders', orderRouter);
router.use('/categories', categorysRouter);

//메인 페이지 및 상품 조회(비회원 기능)
// router.get('/', categoryAndProducts); // 전체 카테고리 & 상품 목록 조회

module.exports = router;
