import Joi from 'joi';

// 회원가입 요청 스키마
export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
});

// 사용자 정보 업데이트 요청 스키마
export const updateUserSchema = Joi.object({
  fullName: Joi.string(),
  password: Joi.string(),
  address: Joi.string(),
  phoneNumber: Joi.string(),
  currentPassword: Joi.string().required(),
});