import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema.js';

const Category = model('Category', CategorySchema); // Category 모델을 정의

// CategoryModel 클래스 정의
class CategoryModel {
  // 모든 카테고리 조회
  async findAll() {
    const categories = await Category.find({}).populate('products'); // 모든 카테고리와 해당 카테고리에 속한 제품들을 조회합니다.
    return categories;
  }

  // ID로 카테고리 조회
  async findById(categoryId) {
    const category = await Category.findById(categoryId).populate('products'); // ID로 카테고리와 해당 카테고리에 속한 제품들을 조회합니다.
    return category;
  }

  // 카테고리 생성
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo); // 새 카테고리를 생성합니다.
    return createdNewCategory;
  }

  // 카테고리 삭제
  async delete(categoryId) {
    const deletedCategory = await Category.findByIdAndDelete(categoryId); // ID로 카테고리를 삭제합니다.
    return deletedCategory;
  }

  // 카테고리 수정
  async update({ categoryId, update }) {
    const filter = { _id: categoryId }; // 수정할 카테고리를 찾는 필터
    const option = { returnOriginal: false }; // 수정된 문서를 반환

    const updatedCategory = await Category.findOneAndUpdate(
      filter, update, option
    ); // 카테고리를 수정합니다.
    return updatedCategory;
  }

  // 카테고리에 제품 추가
  async addProduct(categoryId, productId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    if (category.products.includes(productId)) {
      throw new Error('Product already exists in category');
    }


    category.products.push(productId); // 카테고리에 제품 ID를 추가
    await category.save(); // 변경 사항 저장

    // 카테고리와 함께 제품 정보를 반환
    const populatedCategory = await Category.findById(categoryId).populate(
      'products'
    );

    return populatedCategory;
  }

  // 카테고리에서 제품 삭제
  async removeProduct(categoryId, productId) {
    const category = await Category.findById(categoryId);//.populate('products');----오류나면 수정
    if (!category) {
      throw new Error('Category not found');
    }

    category.products = category.products.filter(
      p => p.toString() !== productId
    ); // 카테고리에서 제품 ID를 제거합니다.
    await category.save(); // 변경 사항을 저장
    // 카테고리와 함께 제품 정보를 반환--------오류나면 수정
    //const populatedCategory = await Category.findById(categoryId).populate(
    //  'products'
    //);

    //return populatedCategory;
    return category;
  }
}

const categoryModel = new CategoryModel(); // CategoryModel 클래스의 인스턴스를 생성

export { categoryModel }; // 인스턴스를 내보내어 애플리케이션의 다른 부분에서 사용할 수 있도록 함 
