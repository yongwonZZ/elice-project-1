const asyncHandler = require('express-async-handler');
const Order = require('../db/models');
const { notFoundError, databaseError } = require('../middlewares/errorHandler');

// 전체 주문 목록 조회
const getOrderList = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders.length === 0) {
    throw new notFoundError('현재 들어온 주문이 없습니다.');
  }
  res.json(orders);
});

// 사용자 주문 목록 조회
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  if (orders.length === 0) {
    throw new notFoundError('현재 들어온 주문이 없습니다.');
  }
  res.json(orders);
});

// 주문 상세조회
const getOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new notFoundError('주문이 존재하지 않습니다.');
  }
  res.json(order);
});

// 주문 신청
const createOrder = asyncHandler(async (req, res) => {
  const {
    productId,
    receiver,
    quantity,
    phone,
    address,
    deliveryStatus,
    totalPrice,
  } = req.body;

  const order = new Order({
    userId: req.user._id, // 주문 신청 때 주문자의 id
    productId,
    quantity,
    receiver,
    phone,
    address,
    deliveryStatus,
    totalPrice,
  });

  if (!order) {
    throw new notFoundError('주문이 신청되지 않았습니다.');
  }

  await order.save();

  res.json({ message: '주문이 완료되었습니다.' });
});

// 주문 수정  /user/orders/:id
const updateOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, receiver, phone, address } = req.body;
  const orderId = req.params.id;
  const updatedOrder = await Order.updateOne(
    { _id: orderId },
    { productId, quantity, receiver, phone, address },
    { new: true }
  );

  if (updatedOrder.modifiedCount === 0) {
    throw new notFoundError('주문을 찾을 수 없습니다.');
  }

  res.json({ message: '주문이 수정되었습니다.' });
});

// 주문 삭제
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const findOrder = await Order.findById(orderId);
  if (!findOrder) {
    throw new notFoundError('주문을 찾을 수 없습니다.');
  }
  const deleted = await Order.deleteOne({ _id: orderId });
  if (deleted.deletedCount === 0) {
    throw new databaseError('서버 오류입니다.');
  }
  res.json({ message: '주문이 삭제되었습니다.' });
});

// 상태 수정
const updateStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new notFoundError('주문이 존재하지 않습니다.');
  }
  const newStatus = req.body.status; // 새로운 state 값
  order.status = newStatus; // 주문의 state 값을 업데이트
  const updatedStatus = await order.save(); // 변경된 주문을 저장
  res.json({
    status: updatedStatus.status,
    message: '상태 수정 완료',
  }); // 업데이트된 주문을 반환
});

module.exports = {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrderList,
  updateStatus,
};
