import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Product 스키마 정의
const ProductSchema = new Schema({
  

  id: {
    type: String,
    default: () => uuidv4(), // uuid v4 함수로 기본값을 설정
    required: true,
  },
  
  name: {
    type: String,
    required: true,
  },
  
  price: {
    type: Number,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  
  img: {
    type: String,
    required: true,
  },

  //상품의 판매량
  sold: {
    type: Number,
    maxlength: 100,
    default: 0,//새로운 상품이 생성될 때 sold 필드는 기본값 0으로 초기화
  },
  
});

// 텍스트 인덱스 생성
ProductSchema.index(
  {
    name: "text", // name 필드에 텍스트 인덱스를 생성
    description: "text", // description 필드에 텍스트 인덱스를 생성
  },
  {
    weights: {
      name: 5, // name 필드의 가중치를 5로 설정.
      description: 1, // description 필드의 가중치를 1로 설정
    },
  }
);

// Product 모델을 모듈로 내보내기.
// 다른 파일에서 import를 통해 이 모델을 사용할 수 있음.
export { ProductSchema };
