// server.js (ES Modules) >>require 대신 import 문을 사용?
import express from 'express';
import path from 'path';
import db from './BE/000/db.js'; // db 불러오기
import route from './src/routers.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));

db(); // MongoDB 연결 실행

app.use(express.static(path.join(__dirname, 'html')));
app.use('/', route);

app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
