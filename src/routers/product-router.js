

import express from 'express';
import Product from '../schemas/product.js';

const router = express.Router();

// 모든 제품 조회
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('제품 조회 실패:', error);
    res.status(500).json({ message: '제품 조회 실패' });
  }
});

// 특정 제품 조회
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json(product);
  } catch (error) {
    console.error('제품 조회 실패:', error);
    res.status(500).json({ message: '제품 조회 실패' });
  }
});

// 새 제품 추가
router.post('/products', async (req, res) => {
  const { id, name, price, des, img } = req.body;
  try {
    const newProduct = new Product({ id, name, price, des, img });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('제품 추가 실패:', error);
    res.status(500).json({ message: '제품 추가 실패' });
  }
});

// 제품 업데이트
router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price, des, img } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      { name, price, des, img },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('제품 업데이트 실패:', error);
    res.status(500).json({ message: '제품 업데이트 실패' });
  }
});

// 제품 삭제
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    res.json({ message: '제품 삭제 완료' });
  } catch (error) {
    console.error('제품 삭제 실패:', error);
    res.status(500).json({ message: '제품 삭제 실패' });
  }
});

export default router;
