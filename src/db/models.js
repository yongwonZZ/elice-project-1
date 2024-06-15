const mongoose = require('mongoose');

const userSchema = require('./schemas/userSchema');
const productSchema = require('./schemas/productSchema');
const orderSchema = require('./schemas/orderSchema');
const categorySchema = require('./schemas/categorySchema');

const User = mongoose.model('user', userSchema);
const Product = mongoose.model('product', productSchema);
const Order = mongoose.model('order', orderSchema);
const Category = mongoose.model('category', categorySchema);

module.exports = { User, Product, Order, Category };
