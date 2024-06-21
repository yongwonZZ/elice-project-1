import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema.js';

const Product = model('Product', ProductSchema);


class ProductModel {
  async findAll({ skip = 0, limit = 30 } = {}) {
    const products = await Product.find({}).skip(skip).limit(limit).exec();
    return products;
  }

  async countProducts(filter = {}) {
    const countedProducts = await Product.countDocuments(filter);
    return countedProducts;
  }
/*
// ProductModel 클래스 정의
class ProductModel {
  // 전체 제품 조회
  async findAll({ skip = 0, limit = 10 } = {}) {
    const products = await Product.find({}).skip(skip).limit(limit).exec();
    return products;
  }
  /*
  async findAll() {
    const products = await Product.find({}); // 모든 제품을 조회
    return products;
  }*/

  // ID로 제품 조회
  async findById(productId) {
    const product = await Product.findById(productId); // ID로 제품을 조회
    return product;
  }

  // 제품 생성
  async create(productDes) {
    const createdNewProduct = await Product.create(productDes); // 새 제품을 생성
    return createdNewProduct;
  }

  // 제품 삭제
  async delete(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId); // ID로 제품을 삭제
    return deletedProduct;
  }

  // 제품 수정
  async update({ productId, update }) {
    const filter = { _id: productId }; // 수정할 제품 찾는 필터
    const option = { returnOriginal: false }; // 수정된 문서 반환

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    ); // 제품을 수정
    return updatedProduct;
  }

  // 제품 개수
  async countProducts(filter) {
    const countedProducts = await Product.countDocuments(filter); // 필터 조건에 맞는 제품 개수 카운트
    return countedProducts;
  }

  // 텍스트로 제품 검색
  async search(text) {
    const products = await Product.find({ $text: { $search: text } }); // 텍스트 쿼리로 제품을 검색
    return products;
  }
}

const productModel = new ProductModel(); // ProductModel 클래스의 인스턴스 생성

export { productModel }; // 인스턴스를 내보내 애플리케이션의 다른 부분에서 사용할 수 있도록
