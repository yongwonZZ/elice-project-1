import { Router } from 'express';
import { loginRequired, adminRequired } from '../middlewares/index.js';
import { orderService } from '../services/index.js';
import { orderSchema, updateOrderSchema } from '../db/joi-schemas/index.js'; // Joi 스키마 파일 import

const orderRouter = Router();

// 주문 생성
orderRouter.post('/new-order', loginRequired, async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, productList, receiver, phone, address, deliveryStatus } =
      req.body;
    const date = new Date(); // 현재 시간 사용
    const newOrder = await orderService.addOrder({
      userId,
      productList,
      receiver,
      phone,
      address,
      deliveryStatus, // default '결제완료'
      createdDate: date,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 주문 수정
orderRouter.patch('/orders/:oid', loginRequired, async (req, res, next) => {
  try {
    const { error } = updateOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const orderId = req.params.oid;
    const { receiver, phone, address, deliveryStatus } = req.body;
    const orderInfoRequired = { orderId };

    const toUpdate = {};
    if (receiver) toUpdate.receiver = receiver;
    if (phone) toUpdate.phone = phone;
    if (address) toUpdate.address = address;
    if (deliveryStatus) toUpdate.deliveryStatus = deliveryStatus;

    const updatedUserInfo = await orderService.updateOrderInfo(
      orderInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

// 주문 삭제
orderRouter.delete('/orders', loginRequired, async (req, res, next) => {
  try {
    const orderId = req.query.oid;
    const deletedOrderInfo = await orderService.deleteOrder(orderId);
    res.status(200).json({ message: '주문 삭제 성공', data: deletedOrderInfo });
  } catch (error) {
    next(error);
  }
});

// 전체 주문 리스트
orderRouter.get('/orders/:uid', loginRequired, async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const orderListByUserId = await orderService.getOrderListByUserId(userId);
    res.status(200).json(orderListByUserId);
  } catch (error) {
    next(error);
  }
});

// 관리자 상품 전체 조회
orderRouter.get('/admin/orders/', adminRequired, async (req, res, next) => {
  try {
    const orderLists = await orderService.getOrderLists();
    res.status(200).json(orderLists);
  } catch (error) {
    next(error);
  }
});

// 관리자의 주문 상태 변경 기능
orderRouter.patch(
  '/admin/orders/:oid',
  adminRequired,
  async (req, res, next) => {
    try {
      const { error } = updateOrderSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const orderId = req.params.oid;
      const { deliveryStatus } = req.body;

      const orderInfoRequired = { orderId };
      const toUpdate = {};
      if (deliveryStatus) toUpdate.deliveryStatus = deliveryStatus;

      const statusUpdatedOrder = await orderService.updateOrderStatus(
        orderInfoRequired,
        toUpdate
      );
      res.status(200).json(statusUpdatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

// 관리자의 주문 삭제 기능
orderRouter.delete(
  '/admin/orders/:oid',
  adminRequired,
  async (req, res, next) => {
    try {
      const orderId = req.params.oid;
      const deletedOrderInfo = await orderService.deleteOrder(orderId);
      res
        .status(200)
        .json({ message: '주문 삭제 성공', data: deletedOrderInfo });
    } catch (error) {
      next(error);
    }
  }
);

export { orderRouter };
