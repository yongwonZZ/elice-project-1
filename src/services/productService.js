import Product from '../src/db/schemas/productSchema.js';

// 모든 제품 조회
export const getProducts = async () => {
  return await Product.find();
};

// 특정 제품 조회
export const getProduct = async (id) => {
  return await Product.findOne({ id });
};

// 새 제품 추가
export const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

// 제품 업데이트
export const updateProduct = async (id, updateData) => {
  return await Product.findOneAndUpdate({ id }, updateData, { new: true });
};

// 제품 삭제
export const deleteProduct = async (id) => {
  return await Product.findOneAndDelete({ id });
};


const productService = new productService(productModel);

export { productService };
