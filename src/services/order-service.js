import { orderModel } from '../db/index.js';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 생성 (주문이 생성되지 않으면 에러 반환)
  async createOrder(orderInfo) {
    const createdOrder = await this.orderModel.create(orderInfo);
    if (!createdOrder) {
      throw new Error('주문이 신청되지 않았습니다.');
    }
    return createdOrder;
  }

  // 주문 삭제 (주문을 찾고, 주문이 없으면 에러 반환하고 deliveryStatus가 '결제완료'인 주문만 삭제 가능)
  async deleteOrder(orderId) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error('해당 주문을 찾을 수 없습니다.');
    }

    if (order.deliveryStatus === '결제완료') {
      await this.orderModel.deleteById(orderId);
    } else {
      throw new Error('배송중인 주문은 삭제할 수 없습니다.');
    }
  }

  // 주문 수정 (주문을 찾고, 주문이 없으면 에러 반환하고 deliveryStatus가 '결제완료'인 주문만 수정 가능)
  async updateOrder(orderInfoRequired, toUpdate) {
    const { orderId } = orderInfoRequired;
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error('해당 주문을 찾을 수 없습니다.');
    }

    if (order.deliveryStatus === '결제완료') {
      const updatedOrder = await this.orderModel.update({
        orderId,
        update: toUpdate,
      });
      return updatedOrder;
    } else {
      throw new Error('배송중인 주문은 수정할 수 없습니다.');
    }
  }

  // 주문 조회 (주문이 없으면 빈 배열 반환)
  async getOrderListByUserId(userId, page, limit) {
    const skip = (page - 1) * limit;
    const orders = await Order.find({ userId }).skip(skip).limit(limit);
    const totalOrders = await Order.countDocuments({ userId });
    return { orders, totalOrders, totalPages: Math.ceil(totalOrders / limit) };
  }

  // 관리자 주문 조회 (주문이 없으면 빈 배열 반환)
  async getOrderLists(page, limit) {
    const skip = (page - 1) * limit;
    const orders = await Order.find().skip(skip).limit(limit);
    const totalOrders = await Order.countDocuments();
    return { orders, totalOrders, totalPages: Math.ceil(totalOrders / limit) };
  }

  // 관리자 주문 수정 (주문을 찾고 주문이 없으면 에러 반환)
  async updateOrderStatus(orderInfoRequired, toUpdate) {
    const { orderId } = orderInfoRequired;
    const order = await this.orderModel.findById(orderId);

    // 주문이 존재하지 않으면 에러를 반환
    if (!order) {
      throw new Error('해당 주문을 찾을 수 없습니다.');
    }

    const updatedOrder = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });
    return updatedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
