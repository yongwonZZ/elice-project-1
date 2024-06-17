import { Router } from 'express';
import { loginRequired } from '../middlewares/login-required';
import { adminRequired } from '../middlewares/admin-required';
import { productModel } from '../models/product-model';

const productRouter = Router();

// 모든 제품 조회 (일반 사용자도 가능)
productRouter.get('/products', async (req, res, next) => {
  try {
    const products = await productModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// ID로 제품 조회 (일반 사용자도 가능)
productRouter.get('/products/:id', async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: '제품을 찾을 수 없습니다.' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// 제품 생성 (관리자 전용)
productRouter.post('/products', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
});

// 제품 수정 (관리자 전용)
productRouter.put('/products/:id', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const updatedProduct = await productModel.update({ productId: req.params.id, update: req.body });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: '제품을 찾을 수 없습니다.' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 제품 삭제 (관리자 전용)
productRouter.delete('/products/:id', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const deletedProduct = await productModel.delete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: '제품을 찾을 수 없습니다.' });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
