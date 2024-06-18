import { Schema } from 'mongoose';

// Order Schema 정의
const OrderSchema = new Schema({
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
  //indexedDB를 활용해서 cart를 구현하면, 상품id와 수량을 FE에서???
  productList: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  address: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    default: '결제완료', // 배송중, 배송완료
  },
  orderDate: {
    type: String,
    default: Date.now,
  },
});

export { OrderSchema };
