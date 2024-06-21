// ../db/joi-schemas/orderSchema.js
import Joi from 'joi';

// 주문 생성 스키마
const orderSchema = Joi.object({
  userId: Joi.string().required(),
  productList: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  receiver: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  deliveryStatus: Joi.string().default('결제완료'),
});

// 주문 수정 스키마
const updateOrderSchema = Joi.object({
  receiver: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  deliveryStatus: Joi.string().optional(),
});

export { orderSchema, updateOrderSchema };
