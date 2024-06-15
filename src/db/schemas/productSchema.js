const mongoose = require('mongoose');
const{Schema} = mongoose;

const productSchema = new Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true },

  name: { 
    type: String, 
    required: true },

  price: { 
    type: Number, 
    required: true },

  des: { 
    type: String, 
    required: true },

  img: { 
    type: String, 
    required: true },
});


const Product = mongoose.model('Product', productSchema); // 모델 이름을 'Product'로 수정

module.exports = Product;