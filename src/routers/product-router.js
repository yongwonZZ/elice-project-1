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

    const { name, category, price, description, img, sold } = req.body;
    const newProduct = await productService.addProduct({
      name,
      category,
      price,
      description,
      img,
      sold,
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
    const { name, price, description, img, sold } = req.body;
    const toUpdate = {};

    if (name) toUpdate.name = name;
    if (price) toUpdate.price = price;
    if (description) toUpdate.description = description;
    if (img) toUpdate.img = img;
    if (sold) toUpdate.stock = sold;

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



// 모든 제품 조회 (페이지네이션 추가)
productRouter.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;  // <-- 기본값 설정과 10진수 변환
  const limit = parseInt(req.query.limit, 10) || 10;  // <-- 기본값 설정과 10진수 변환

  try {
    const { products, totalProducts, totalPages } = await productService.getAllProducts(page, limit);
    res.status(200).json({
      products,
      pageInfo: {
        currentPage: page,
        totalPages,
        totalProducts,
      },
    });
  } catch (error) {
    next(error);
  }
});

// 모든 제품 조회 (페이지네이션 추가)
/*productRouter.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { products, totalProducts, totalPages } = await productService.getAllProducts(page, limit);
    res.status(200).json({
      products,
      pageInfo: {
        currentPage: page,
        totalPages,
        totalProducts,
      },
    });
  } catch (error) {
    next(error);
    //res.status(500).json({ error: error.message });-----오류나면 수정
  }
});*/

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
