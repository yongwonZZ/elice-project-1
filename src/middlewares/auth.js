import jwt from 'jsonwebtoken';

// 인증 미들웨어 함수
const auth = (req, res, next) => {
  // 요청 헤더에서 토큰 추출
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  try {
    // 토큰 검증 및 디코딩
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 디코딩된 사용자 정보를 요청 객체에 추가
    next(); // 다음 미들웨어 또는 라우트 핸들러 호출
  } catch (error) {
    console.error('토큰 검증 실패:', error);
    res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

export default auth;

