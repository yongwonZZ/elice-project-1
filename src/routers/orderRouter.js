const express = require('express');
const { orderService } = require('./orderService');

const router = express.Router();

// 모든 주문 조회
router.get('/', async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 유저의 주문 조회
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await orderService.getOrder(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 주문 생성
router.post('/', async (req, res) => {
  try {
    const newOrder = await orderService.addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 주문 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrder = await orderService.setOrder(id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 주문 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await orderService.deleteOrder(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
