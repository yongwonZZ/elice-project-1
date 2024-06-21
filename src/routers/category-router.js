// routes/category-router.js
import { Router } from 'express';
import { loginRequired } from '../middlewares/login-required.js';
import { adminRequired } from '../middlewares/admin-required.js';
import { categoryModel } from '../db/index.js';

const categoryRouter = Router();

// 모든 카테고리 조회 (일반 사용자도 가능)
categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await categoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}); 

// ID로 카테고리 조회 (일반 사용자도 가능)
categoryRouter.get('/:id', async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

// 카테고리 생성 (관리자 전용)
categoryRouter.post(
  '/',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const createdCategory = await categoryModel.create(req.body);
      res.status(201).json(createdCategory);
    } catch (error) {
      next(error);
    }
  }
);

// 카테고리 수정 (관리자 전용)
categoryRouter.put(
  '/:id',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const updatedCategory = await categoryModel.update({
        categoryId: req.params.id,
        update: req.body,
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

// 카테고리 삭제 (관리자 전용)
categoryRouter.delete(
  '/:id/delete',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const deletedCategory = await categoryModel.delete(req.params.id);
      res.status(200).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

// 카테고리에 제품 추가 (관리자 전용)
categoryRouter.post(
  '/:id/products',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const updatedCategory = await categoryModel.addProduct(
        req.params.id,
        req.body.productId
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

// 카테고리에서 제품 삭제 (관리자 전용)
categoryRouter.delete(
  '/:id/products/:productId',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const updatedCategory = await categoryModel.removeProduct(
        req.params.id,
        req.params.productId
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

export { categoryRouter };
