import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema.js';

const Order = model('orders', OrderSchema);

class OrderModel {
  // 전체 주문 조회
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  // ID로 주문 조회
  async findById(orderId) {
    const order = await Order.findById(orderId);
    return order;
  }

  // 유저 ID로 주문 조회
  async findByUserId(userId, skip = 0, limit = 10) {
    const orders = await Order.find({ userId }).skip(skip).limit(limit);
    return orders;
  }

  // 주문 생성
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 주문 삭제
  async delete(orderId) {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
  }

  // 주문 수정
  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  // 주문 개수
  async countOrders(filter) {
    const countedOrders = await Order.countDocuments(filter);
    return countedOrders;
  }
}

const orderModel = new OrderModel();

export { orderModel };
