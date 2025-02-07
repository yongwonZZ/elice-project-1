import { Router } from 'express';
import { loginRequired, adminRequired } from '../middlewares/index.js';
import { orderService } from '../services/index.js';
import { orderSchema, updateOrderSchema } from '../db/joi-schemas/index.js';

const orderRouter = Router();

// 주문 생성
orderRouter.post('/new-order', loginRequired, async (req, res, next) => {
  try {
    await orderSchema.validateAsync(req.body);

    const {
      userId,
      productList,
      receiver,
      phoneNumber,
      address,
      deliveryStatus,
    } = req.body;
    const date = new Date(); // 현재 시간 사용
    const newOrder = await orderService.createOrder({
      userId,
      productList,
      receiver,
      phoneNumber,
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
orderRouter.patch('/:oid', loginRequired, async (req, res, next) => {
  try {
    await updateOrderSchema.validateAsync(req.body);

    const orderId = req.params.oid;
    const { receiver, phoneNumber, address, deliveryStatus } = req.body;
    const orderInfoRequired = { orderId };

    const toUpdate = {};
    if (receiver) toUpdate.receiver = receiver;
    if (phoneNumber) toUpdate.phoneNumber = phoneNumber;
    if (address) toUpdate.address = address;
    if (deliveryStatus) toUpdate.deliveryStatus = deliveryStatus;

    const updatedUserInfo = await orderService.updateOrder(
      orderInfoRequired,
      toUpdate
    );

    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

// 주문 삭제
orderRouter.delete('/:oid', loginRequired, async (req, res, next) => {
  try {
    const orderId = req.params.oid;
    const deletedOrderInfo = await orderService.deleteOrder(orderId);
    res.status(200).json({ message: '주문 삭제 성공', data: deletedOrderInfo });
  } catch (error) {
    next(error);
  }
});

// 전체 주문 리스트 (페이지네이션 적용)
orderRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    console.log(`userId: ${userId} `);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const orderListByUserId = await orderService.getOrderListByUserId(
      userId,
      page,
      limit
    );
    res.status(200).json(orderListByUserId);
  } catch (error) {
    console.error(`${error.message}`);
    next(error);
  }
});

// // 특정 주문 상세 조회
// orderRouter.get('/:uid/:oid', loginRequired, async (req, res, next) => {
//   try {
//     const userId = req.params.uid;
//     const orderId = req.params.oid;

//     const orderById = await orderService.getOrderById(orderId);
//     if (orderById.userId.toString() !== userId) {
//       return res.status(403).json({
//         message: 'Access forbidden: Order does not belong to this user',
//       });
//     }

//     res.status(200).json(orderById);
//   } catch (error) {
//     next(error);
//   }
// });

// // 관리자 상품 전체 조회 (페이지네이션 적용)
// orderRouter.get(
//   '/admin/:uid',
//   loginRequired,
//   adminRequired,
//   async (req, res, next) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;
//       const orderLists = await orderService.getOrderLists(page, limit);
//       res.status(200).json(orderLists);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // 관리자의 주문 상태 변경 기능
// orderRouter.patch('/admin/:oid', adminRequired, async (req, res, next) => {
//   try {
//     await updateOrderSchema.validateAsync(req.body);

//     const orderId = req.params.oid;
//     const { deliveryStatus } = req.body;

//     const orderInfoRequired = { orderId };
//     const toUpdate = {};
//     if (deliveryStatus) toUpdate.deliveryStatus = deliveryStatus;

//     const statusUpdatedOrder = await orderService.updateOrderStatus(
//       orderInfoRequired,
//       toUpdate
//     );
//     res.status(200).json(statusUpdatedOrder);
//   } catch (error) {
//     next(error);
//   }
// });

// // 관리자의 주문 삭제 기능
// orderRouter.delete('/admin/:oid', adminRequired, async (req, res, next) => {
//   try {
//     const orderId = req.params.oid;
//     const deletedOrderInfo = await orderService.deleteOrder(orderId);
//     res.status(200).json({ message: '주문 삭제 성공', data: deletedOrderInfo });
//   } catch (error) {
//     next(error);
//   }
// });

export { orderRouter };
