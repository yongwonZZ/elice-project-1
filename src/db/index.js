import mongoose from 'mongoose';

const DB_URL = process.env.MONGODB_URL || "mongodb+srv://seonseon042:7IQXfch2LKcTIv89@mongodb-sample.3flbdwk.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-sample";

// MongoDB와 연결 설정
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.');
});

db.on('error', (error) => {
  console.error('MongoDB 연결 실패:', error);
});

export default db;



// user-model.js 에서 export { ~~ } 한 모듈을 그대로 다시 export해 줌
// 이렇게 하면, 나중에 import 할 때 코드가 짧아짐
// 예시로, import userModel from '../db/models/user-model' 대신 from '../db' 가 됨
// '../db/index.js' 에서 index.js 는 생략 가능하므로, '../db' 면 됨 (index는 특별한 용어)
export * from "./models/user-model";
