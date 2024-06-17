// routes/category-router.js
import { Router } from 'express';
import { loginRequired } from '../middlewares/login-required';
import { adminRequired } from '../middlewares/admin-required';
import { categoryModel } from '../models/category-model';

const categoryRouter = Router();

// 모든 카테고리 조회 (일반 사용자도 가능)
categoryRouter.get('/categories', async (req, res, next) => {
  try {
    const categories = await categoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});//-------------------'/categories'엔드포인트 정의 어디서 하는건지?

// ID로 카테고리 조회 (일반 사용자도 가능)
categoryRouter.get('/categories/:id', async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

// 카테고리 생성 (관리자 전용)
categoryRouter.post('/categories', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const createdCategory = await categoryModel.create(req.body);
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
});

// 카테고리 수정 (관리자 전용)
categoryRouter.put('/categories/:id', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.update({ categoryId: req.params.id, update: req.body });
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 카테고리 삭제 (관리자 전용)
categoryRouter.delete('/categories/:id', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const deletedCategory = await categoryModel.delete(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

// 카테고리에 제품 추가 (관리자 전용)
categoryRouter.post('/categories/:id/products', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.addProduct(req.params.id, req.body.productId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 카테고리에서 제품 삭제 (관리자 전용)
categoryRouter.delete('/categories/:id/products/:productId', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.removeProduct(req.params.id, req.params.productId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
