import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

// Product Joi 스키마
const productSchema = Joi.object({
  id: Joi.string().default(() => uuidv4()).required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  img: Joi.string().required(),
  sold: Joi.number().max(100).default(0),
});

// Product 수정 Joi 스키마
const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  img: Joi.string().optional(),
  sold: Joi.number().max(100).optional(),
});

//category Joi 스키마
const categorySchema = Joi.object({
  id: Joi.string()
    .guid({ version: ['uuidv4'] }) // UUID v4 형식으로 설정
    .default(() => uuidv4())
    .required(),

  name: Joi.string().required(),

  products: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId 형식 검증
    .optional(), // 제품이 없는 카테고리도 존재할 수 있으므로 optional로 설정
});

// Category 수정 Joi 스키마
const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
  products: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

export {
  productSchema,
  updateProductSchema,
  categorySchema,
  updateCategorySchema,
};
