import { CategoryModel } from '../db/category-model.js';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryModel.find().populate('products');
      return categories;
    } catch (error) {
      throw new Error('카테고리를 조회하는 도중 오류가 발생했습니다.');
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await this.categoryModel.findById(categoryId).populate('products');
      if (!category) {
        throw new Error('카테고리를 찾을 수 없습니다.');
      }
      return category;
    } catch (error) {
      throw new Error('카테고리를 조회하는 도중 오류가 발생했습니다.');
    }
  }

  async createCategory(categoryData) {
    try {
      const createdCategory = await this.categoryModel.create(categoryData);
      return createdCategory;
    } catch (error) {
      throw new Error('카테고리를 생성하는 도중 오류가 발생했습니다.');
    }
  }

  async updateCategory(categoryId, updatedFields) {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        categoryId,
        updatedFields,
        { new: true }
      );
      if (!updatedCategory) {
        throw new Error('카테고리를 찾을 수 없습니다.');
      }
      return updatedCategory;
    } catch (error) {
      throw new Error('카테고리를 수정하는 도중 오류가 발생했습니다.');
    }
  }

  async deleteCategory(categoryId) {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        throw new Error('카테고리를 찾을 수 없습니다.');
      }
      return deletedCategory;
    } catch (error) {
      throw new Error('카테고리를 삭제하는 도중 오류가 발생했습니다.');
    }
  }

  async addProductToCategory(categoryId, productId) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) {
        throw new Error('카테고리를 찾을 수 없습니다.');
      }
      if (!category.products.includes(productId)) {
        category.products.push(productId);
        await category.save();
      }
      return category;
    } catch (error) {
      throw new Error('카테고리에 제품을 추가하는 도중 오류가 발생했습니다.');
    }
  }

  async removeProductFromCategory(categoryId, productId) {
    try {
      const category = await this.categoryModel.findById(categoryId);
      if (!category) {
        throw new Error('카테고리를 찾을 수 없습니다.');
      }
      category.products = category.products.filter((p) => p.toString() !== productId);
      await category.save();
      return category;
    } catch (error) {
      throw new Error('카테고리에서 제품을 삭제하는 도중 오류가 발생했습니다.');
    }
  }
}

const categoryService = new CategoryService(CategoryModel);

export { categoryService };
