const { Schema } = require('mongoose');

// Order Schema 정의
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orderProduct: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  orderAddress: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ['결제완료', '배송중', '배송 완료'], // 상태를 문자열로 저장
    default: '결제완료', // 기본값 설정
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = { orderSchema };
