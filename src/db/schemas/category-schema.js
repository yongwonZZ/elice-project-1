import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';


// Category Schema 정의
const CategorySchema = new Schema({
  id: {
    type: String,
    default: () => uuidv4(), // uuid v4 함수로 기본값을 설정
  },
  name: {
    type: String,
    required: true,
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});
  //Mongoose에서 MongoDB의 ObjectId를 나타내는 데이터 타입. 
  //MongoDB는 기본적으로 각 문서(document)에 대해 고유한 ObjectId를 자동으로 생성하여 할당. 이 ObjectId는 MongoDB의 _id 필드에 저장, 각 문서를 고유하게 식별하는 데 사용


export { CategorySchema };