const express = require('express');
const {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
  getOrderList,
  getOrders,
} = require('../services/orderService');
const permission = require('../middlewares/permission');
const router = express.Router();

router.put('/admin/:id', permission('admin'), updateOrder); // 주문 수정
router.delete('/admin/:id', permission('admin'), deleteOrder); // 주문 삭제
router.patch('/admin/:id', permission('admin'), updateStatus); // 상태 수정
router.get('/admin', permission('admin'), getOrderList); // 전체주문 조회

router.get('/', permission('user'), getOrders); // 주문 조회
router.post('/', permission('user'), createOrder); // 주문 추가
router.put('/:id', permission('user'), updateOrder); // 주문 수정
router.get('/:id', permission('user'), getOrder); // 주문 상세

module.exports = router;
