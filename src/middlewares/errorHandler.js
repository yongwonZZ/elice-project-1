// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
/*function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  // 에러는 400 코드의 JSON 형태로 프론트에 전달됨
  res.status(400).json({ result: "error", reason: error.message });
}
*/

// errorhandler.js

function errorHandler(err, req, res, next) {
  console.error('에러 발생:', err); 

  // 클라이언트에게 이미 응답이 전송된 경우
  if (res.headersSent) {
    return next(err); // 다음 핸들러에게 에러 전달
  }

  // 에러 메시지에 따른 적절한 응답 전송
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: '올바른 제품 ID를 제공해야 합니다' });
  }


  res.status(500).json({ message: '서버 에러 발생' });
}

export default errorHandler;

