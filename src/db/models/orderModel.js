const mongoose = require('mongoose');
const OrderSchema = require('../schemas/orderSchema');

const Order = mongoose.model('orders', OrderSchema);

class OrderModel {
  async find(userId) {
    return await Order.find({ userId });
  }
  async findById(_id) {
    return await Order.findById(_id);
  }

  async create(orderInfo) {
    return await Order.create(orderInfo);
  }

  async findAll() {
    return await Order.find({});
  }

  async update({ _id, update }) {
    return await Order.findOneAndUpdate({ _id }, update, {
      returnOriginal: false,
    });
  }

  async delete(_id) {
    return await Order.deleteOne({ _id });
  }
}

const orderModel = new OrderModel();

module.exports = { orderModel };
