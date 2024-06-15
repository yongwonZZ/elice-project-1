import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productServices';
import auth from '../middlewares/auth'; // 사용자 인증 미들웨어
import permission from '../middlewares/permission'; // 권한 체크 미들웨어
import Product from '../src/db/schemas/productSchema.js';

const router = express.Router();

// 새 제품 추가
router.post('/', auth, permission('admin'), async (req, res, next) => {
  try {
    const { name, price, des, img } = req.body;
    // createProduct 함수를 사용하여 제품을 생성하고 생성된 제품을 반환
    const newProduct = await createProduct({ name, price, des, img });
    res.status(201).json(newProduct); // HTTP 상태 코드 201(Created)와 생성된 제품을 JSON 형식으로 응답
  } catch (error) {
    next(error); // 에러를 다음 핸들러에 전달
  }
});

// 제품 업데이트
router.put('/:id', auth, permission('admin'), async (req, res, next) => {
  const productId = req.params.id;
  const { name, price, des, img } = req.body;
  try {
    // updateProduct 함수를 사용하여 제품을 업데이트하고 업데이트된 제품을 반환
    const updatedProduct = await updateProduct(productId, { name, price, des, img });
    if (!updatedProduct) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json(updatedProduct); // 업데이트된 제품을 JSON 형식으로 응답
  } catch (error) {
    next(error); // 에러를 다음 핸들러에 전달
  }
});

// 제품 삭제
router.delete('/:id', auth, permission('admin'), async (req, res, next) => {
  const productId = req.params.id;
  try {
    // deleteProduct 함수를 사용하여 제품을 삭제하고 삭제 완료 메시지를 응답
    const deletedProduct = await deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json({ message: '제품 삭제 완료' }); // 삭제 완료 메시지를 JSON 형식으로 응답
  } catch (error) {
    next(error); // 에러를 다음 핸들러에 전달
  }
});

// 모든 제품 조회
router.get('/', auth, permission('user'), async (req, res, next) => {
  try {
    // getProducts 함수를 사용하여 모든 제품을 조회하고 조회된 제품 목록을 응답
    const products = await getProducts();
    res.json(products); // 조회된 제품 목록을 JSON 형식으로 응답
  } catch (error) {
    next(error); // 에러를 다음 핸들러에 전달
  }
});

// 특정 제품 조회
router.get('/:id', auth, permission('user'), async (req, res, next) => {
  const productId = req.params.id;
  try {
    // getProduct 함수를 사용하여 특정 제품을 조회하고 조회된 제품을 응답
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json(product); // 조회된 제품을 JSON 형식으로 응답
  } catch (error) {
    next(error); // 에러를 다음 핸들러에 전달
  }
});

// 에러 처리 미들웨어
router.use(errorHandler);

export default router;

