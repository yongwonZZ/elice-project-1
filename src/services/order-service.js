import { orderModel } from '../db/index.js';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 생성 (주문이 생성되지 않으면 에러 반환)
  async createOrder(orderInfo) {
    try {
      const createdOrder = await this.orderModel.create(orderInfo);
      if (!createdOrder) {
        throw new Error('주문이 신청되지 않았습니다.');
      }
      return createdOrder;
    } catch (error) {
      throw new Error(`주문 생성 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 주문 삭제 (주문을 찾고, 주문이 없으면 에러 반환하고 deliveryStatus가 '결제완료'인 주문만 삭제 가능)
  async deleteOrder(orderId) {
    try {
      const order = await this.orderModel.findById(orderId);

      if (!order) {
        throw new Error('해당 주문을 찾을 수 없습니다.');
      }

      if (order.deliveryStatus === '결제완료') {
        await this.orderModel.delete(orderId);
      } else {
        throw new Error('배송중인 주문은 삭제할 수 없습니다.');
      }
    } catch (error) {
      throw new Error(`주문 삭제 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 주문 수정 (주문을 찾고, 주문이 없으면 에러 반환하고 deliveryStatus가 '결제완료'인 주문만 수정 가능)
  async updateOrder(orderInfoRequired, toUpdate) {
    try {
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
    } catch (error) {
      throw new Error(`주문 수정 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  //주문 조회
  async getOrderById(orderId) {
    try {
      const order = await this.orderModel.findById(orderId);
      if (!order) {
        throw new Error('해당 주문을 찾을 수 없습니다.');
      }
      return order;
    } catch (error) {
      throw new Error(`주문 조회 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 주문 리스트 조회 (주문이 없으면 빈 배열 반환)
  async getOrderListByUserId(userId, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const orders = await this.orderModel.findByUserId(userId, skip, limit);
      const totalOrders = await this.orderModel.countOrders({ userId });
      return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
      };
    } catch (error) {
      throw new Error(`주문 조회 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  // 관리자 주문 리스트 조회 (주문이 없으면 빈 배열 반환)
  async getOrderLists(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const orders = await this.orderModel.findAll({ skip, limit });
      const totalOrders = await this.orderModel.countOrders({});
      return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
      };
    } catch (error) {
      throw new Error(
        `주문 목록 조회 중 오류가 발생했습니다: ${error.message}`
      );
    }
  }

  // 관리자 주문 수정 (주문을 찾고 주문이 없으면 에러 반환)
  async updateOrderStatus(orderInfoRequired, toUpdate) {
    try {
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
    } catch (error) {
      throw new Error(
        `주문 상태 수정 중 오류가 발생했습니다: ${error.message}`
      );
    }
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
