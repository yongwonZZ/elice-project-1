const asyncHandler = require('express-async-handler');
const { User } = require('../db/models');
const hashPassword = require('../middlewares/hashPassword'); // 수정된 해시 함수 사용
const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_SECRET;
const {
  notFoundError,
  badRequestError,
  unauthorizedError,
  internalServerError,
} = require('../middlewares/errorHandler');

// 회원 가입
const signup = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;
  const userJoin = await User.findOne({ email });
  if (userJoin) {
    throw new badRequestError('이미 가입하신 회원입니다.');
  }
  const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
    role,
  });
  if (!user) {
    throw new notFoundError('사용자가 존재하지 않습니다.');
  }
  res.json({ message: `${User.name}님 회원가입 성공.` });
});

// 로그인
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new notFoundError('이메일 또는 비밀번호 불일치입니다.');
  }

  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    throw new unauthorizedError('이메일 또는 비밀번호 불일치입니다.');
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      permission: user.permission,
    },
    secret,
    { expiresIn: '1h' }
  );

  res.cookie('accessToken', token, { maxAge: 3600000 });
  res.json({ message: `${User.name}님 안녕하세요.` });
});

// 로그아웃
const logout = asyncHandler(async (req, res) => {
  res.cookie('accessToken', null, { maxAge: 0 });
  res.json({ message: '로그아웃 성공.' });
});

// 회원 목록 조회 (관리자)
const getUserList = asyncHandler(async (req, res) => {
  const users = await User.find({}).limit(20);
  if (users.length === 0) {
    throw new notFoundError('요청하신 데이터가 존재하지 않습니다.');
  }
  res.json(users);
});

// 회원 조회
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new notFoundError('사용자가 존재하지 않습니다.');
  }
  res.json(user);
});

// 회원 수정
const updateUser = asyncHandler(async (req, res) => {
  const { password, ...rest } = req.body;
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new notFoundError('사용자를 찾을 수 없습니다.');
  }
  if (password) {
    const hashedPassword = hashPassword(password);
    rest.password = hashedPassword;
  }
  const updatedUser = await User.updateOne({ _id: userId }, rest);
  if (updatedUser.modifiedCount === 0) {
    throw new internalServerError('서버 오류입니다.');
  }
  res.json({ message: '회원 정보가 수정되었습니다.' });
});

// 회원 탈퇴
const resignUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw new notFoundError('사용자를 찾을 수 없습니다.');
  }
  user.deleteAt = Date.now();
  await user.save();
  res.json({ message: '회원 탈퇴 성공.' });
});

// 회원 삭제(탈퇴) - 소프트 삭제
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new notFoundError('사용자를 찾을 수 없습니다.');
  }
  if (user.deleteAt !== null) {
    throw new notFoundError('이미 삭제된 데이터입니다.');
  }
  user.deleteAt = Date.now();
  await user.save();
  res.json({ message: '사용자 데이터가 삭제되었습니다.' });
});

module.exports = {
  signup,
  login,
  logout,
  getUserList,
  updateUser,
  deleteUser,
  getUser,
  resignUser,
};
