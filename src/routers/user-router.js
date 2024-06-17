import { Router } from 'express';
import Joi from 'joi';
import { loginRequired } from '../middlewares';
import { userService } from '../services';
import { registerSchema, updateUserSchema } from './userValidation'; // Joi 스키마 파일 import

const userRouter = Router();

// me로 get 요청이 오면 미들웨어로 확인하고 프로필 정보 반환
userRouter.get('/me', loginRequired, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.currentUserId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 회원가입 API
userRouter.post('/register', async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { fullName, email, password, phoneNumber, address } = req.body;

    const newUser = await userService.addUser({
      fullName,
      email,
      password,
      phoneNumber,
      address,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 로그인 API
userRouter.post('/login', async (req, res, next) => {
  try {
    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const { email, password } = req.body;

    const userToken = await userService.getUserToken({ email, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

// 전체 유저 목록을 가져오는 API (배열 형태임)
// 미들웨어로 loginRequired를 사용하여 jwt 토큰이 없으면 사용 불가한 라우팅임
userRouter.get('/userlist', loginRequired, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정 API
// (예를 들어 /api/users/abc12345로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch('/me', loginRequired, async (req, res, next) => {
  try {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const userId = req.currentUserId;
    const { fullName, password, address, phoneNumber, currentPassword } = req.body;

    if (!currentPassword) {
      throw new Error('정보를 변경하려면 현재 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    const updatedUserInfo = await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 삭제(탈퇴) API
userRouter.delete('/me', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { userRouter };
