const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { User } = require('../db/schemas/userSchema');
const secret = process.env.ACCESS_SECRET;

// 토큰&권한 체크
module.exports = (role) =>
  asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (token === undefined) {
      // 쿠키에 토큰 존재 여부
      const error = { status: 401, message: '인증되지 않은 유저입니다.' };
      next(error);
    }
    const user = jwt.verify(token, secret); // 토큰 검사
    req.user = await User.findById(user.id).select('-password'); // req.user에 유저 할당
    // 권한 유무 체크
    if (
      role === 'user' || // 인자가 유저라면 이미 토큰검사를 했기 때문에 통과
      (role === 'admin' && user.userRole === 'admin')
    ) {
      next();
    } else {
      const error = { status: 403, message: '접근이 제한되었습니다.' };
      next(error);
    }
  });
