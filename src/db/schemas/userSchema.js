const mongoose = require('mongoose');
const { Schema } = mongoose;

// 사용자 스키마 정의
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// 스키마 내보내기
module.exports = userSchema;
