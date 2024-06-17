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
    const order = await this.orderModel.findById(orderId);
    if (order.deliveryStatus === '결제완료') {
      order = await this.orderModel.deleteById(orderId);
    } else {
      throw new Error('배송중인 주문은 삭제할 수 없습니다.');
    }
  }

  //주문 수정
  async updateOrder(orderInfoRequired, toUpdate) {
    const { orderId } = orderInfoRequired;
    const order = await this.orderModel.findById(orderId);

    if (order.deliveryStatus === '결제완료') {
      order = await this.orderModel.update({ orderId, update: toUpdate });
      return order;
    } else {
      throw new Error('배송중인 주문은 수정할 수 없습니다.');
    }
  }

  //주문 조회
  async getOrderListByUserId(userId) {
    const orderList = await this.orderModel.findByUserId(userId);
    return orderList;
  }

  //관리자 주문 조회
  async getOrderLists() {
    const orderLists = await this.orderModel.findAll();
    if (orderLists.length === 0) {
      throw new Error('현재 주문이 없습니다.');
    }
    return orderLists;
  }

  //관리자 주문 수정
  async updateOrderStatus(orderInfoRequired, toUpdate) {
    const { orderId } = orderInfoRequired;
    const updatedOrder = await this.orderModel.update({
      orderId,
      update: toUpdate,
    });
    return updatedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
