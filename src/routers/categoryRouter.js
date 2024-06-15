
import express from 'express';
import Category from '../src/db/schemas/categorySchema.js';

const router = express.Router();

// 모든 카테고리 조회
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
    res.status(500).json({ message: '카테고리 조회 실패' });
  }
});