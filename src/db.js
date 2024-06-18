import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routers/index.js';

// .env 파일에서 환경 변수 로드
dotenv.config();

async function main() {
  // MongoDB 연결 URL
  const dbURI = "mongodb+srv://seonseon042:7IQXfch2LKcTIv89@mongodb-sample.3flbdwk.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-sample";

  // 연결 옵션
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'mongodb-sample' // 사용할 데이터베이스 이름
  };

  try {
    await mongoose.connect(dbURI, options);
    console.log('MongoDB에 성공적으로 연결되었습니다.');

    // Express 애플리케이션 설정
    const app = express();

    //app.set('view engine', 'pug');
    //app.set('views', path.join(__dirname, 'views')); // views 폴더 경로 설정

    //app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공을 위한 public 폴더 경로 설정
    app.use('/', router); // 라우터 설정

    // 서버 실행s
    const port = process.env.PORT || 8080; // 포트 번호 설정
    app.listen(port, () => {
      console.log(`Express App is running on port ${port}`);
    });

  } catch (error) {
    console.error('MongoDB 연결 중 오류가 발생했습니다:', error);
  }
}

// main 함수 실행
main().catch(err => console.error(err));