const mongoose = require('mongoose');
const { Schema } = mongoose;

// 카테고리 스키마 정의
const categorySchema = new Schema({
  categoryId: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

// 스키마 내보내기
module.exports = categorySchema;
