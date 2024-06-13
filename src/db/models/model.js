const mongoose = require('mongoose');

// 각 스키마 파일 불러오기
const userSchema = require('./schemas/userSchema');
const productSchema = require('./schemas/productSchema');
const orderSchema = require('./schemas/orderSchema');
const categorySchema = require('./schemas/categorySchema');

// 모델 정의
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Category = mongoose.model('Category', categorySchema);

// 모델 내보내기
module.exports = { User, Product, Order, Category };
