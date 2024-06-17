import { orderModel } from '../db';
// import { productModel } from '../db';
// import { userModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
    // this.productModel = productModel;
    // this.userModel = userModel;
  }
  //주문 생성
  async createOrder(orderInfo) {
    const { userId, productList, receiver, phone, address, deliveryStatus } =
      orderInfo;

    const createdOrder = await this.orderModel.create(orderInfo);
    if (!createdOrder) {
      throw new Error('주문이 신청되지 않았습니다.');
    }
    return createdOrder;
  }

  //주문 삭제
  async deleteOrder(orderId) {
    const deletedOrder = await this.orderModel.deleteById(orderId);
    if (!deletedOrder) {
      throw new Error('주문이 삭제되지 않았습니다.');
    }
    return deletedOrder;
  }

  async getOrderList() {
    const orders = await this.orderModel.findAll();
    if (orders.length === 0) {
      throw new Error('현재 들어온 주문이 없습니다.');
    }
    return orders;
  }

  async getOrders(userId) {
    const orders = await this.orderModel.findByUserId(userId);
    if (orders.length === 0) {
      throw new Error('현재 들어온 주문이 없습니다.');
    }
    return orders;
  }

  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('주문이 존재하지 않습니다.');
    }
    return order;
  }

  async updateOrder(orderId, update) {
    const updatedOrder = await this.orderModel.update({
      orderId,
      update,
    });
    if (!updatedOrder) {
      throw new Error('주문을 찾을 수 없습니다.');
    }
    return updatedOrder;
  }

  async updateStatus(orderId, status) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('주문이 존재하지 않습니다.');
    }
    const updatedOrder = await this.orderModel.update({
      orderId,
      update: { deliveryStatus: status },
    });
    return updatedOrder;
  }
}

// orderService 인스턴스를 생성할 때 orderModel을 전달합니다.
const orderService = new OrderService(orderModel);

export { orderService };
