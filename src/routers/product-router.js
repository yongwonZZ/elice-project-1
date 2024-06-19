import { Router } from 'express';
import { loginRequired } from '../middlewares/login-required.js';
import { adminRequired } from '../middlewares/admin-required.js';
import { productService } from '../services/product-service.js';
import { productSchema, updateProductSchema } from '../db/joi-schemas/index.js'; // Joi 스키마 파일 import

const productRouter = Router();

// 제품 생성
productRouter.post('/new-product', adminRequired, async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, category, price, description, stock } = req.body;
    const newProduct = await productService.addProduct({
      name,
      category,
      price,
      description,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 제품 수정
productRouter.patch('/:pid', adminRequired, async (req, res, next) => {
  try {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const productId = req.params.pid;
    const { name, category, price, description, stock } = req.body;
    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (category) toUpdate.category = category;
    if (price) toUpdate.price = price;
    if (description) toUpdate.description = description;
    if (stock) toUpdate.stock = stock;

    const updatedProduct = await productService.updateProduct(
      productId,
      toUpdate
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 제품 삭제
productRouter.delete('/:pid', adminRequired, async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await productService.deleteProduct(productId);
    res.status(200).json({ message: '제품 삭제 성공', data: deletedProduct });
  } catch (error) {
    next(error);
  }
});

// 모든 제품 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 특정 제품 조회
productRouter.get('/:pid', async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
