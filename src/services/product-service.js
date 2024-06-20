  import { productModel } from '../db/index.js';

  class ProductService {
    constructor(productModel) {
      this.productModel = productModel;
    }
  

    async getAllProducts(page, limit) {
      try {
        const skip = (page - 1) * limit;
        const products = await this.productModel.findAll({ skip, limit });  // <-- 수정된 부분
        const totalProducts = await this.productModel.countProducts({});
        return {
          products,
          totalProducts,
          totalPages: Math.ceil(totalProducts / limit),
        };
      } catch (error) {
        throw new Error('제품을 조회하는 도중 오류가 발생했습니다.');
      }
    }
  

   /* async getAllProducts(page, limit) {
      try {
        const skip = (page - 1) * limit;
        const products = await this.productModel.find({}).skip(skip).limit(limit);
        const totalProducts = await this.productModel.countDocuments();
        return {
          products,
          totalProducts,
          totalPages: Math.ceil(totalProducts / limit),
        };
      } catch (error) {
        throw new Error('제품을 조회하는 도중 오류가 발생했습니다.');
      }
    }*/
  
async getProductById(productId) {
  try {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('제품을 찾을 수 없습니다.');
    }
    return product;
  } catch (error) {
    throw new Error('제품을 조회하는 도중 오류가 발생했습니다.');
  }
}
    
  
    async createProduct(productData) {
      try {
        const createdProduct = await this.productModel.create(productData);
        return createdProduct;
      } catch (error) {
        throw new Error('제품을 생성하는 도중 오류가 발생했습니다.');
      }
    }
  
    async updateProduct(productId, updateData) {
      try {
        const updatedProduct = await this.productModel.update({ productId, update: updateData });
        if (!updatedProduct) {
          throw new Error('제품을 찾을 수 없습니다.');
        }
        return updatedProduct;
      } catch (error) {
        throw new Error('제품을 수정하는 도중 오류가 발생했습니다.');
      }
    }
  
    async deleteProduct(productId) {
      try {
        const deletedProduct = await this.productModel.delete(productId);
        if (!deletedProduct) {
          throw new Error('제품을 찾을 수 없습니다.');
        }
        return deletedProduct;
      } catch (error) {
        throw new Error('제품을 삭제하는 도중 오류가 발생했습니다.');
      }
    }
  }
  
  //productService 인스턴스를 생성할 때 productModel을 전달
  const productService = new ProductService(productModel);
  export { productService };
  