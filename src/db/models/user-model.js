import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema.js';

const User = model('users', UserSchema); // model함수(스키마이름(복수), 스키마객체)

export class UserModel {
  // 이메일로 사용자 찾기
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // 아이디로 사용자 찾기
  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  // 새로운 사용자 만들기
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  // 모든 사용자 찾기
  async findAll() {
    const users = await User.find({});
    return users;
  }

  // 해당 사용자 업데이트 하기
  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 사용자 삭제
  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    return deletedUser;
  }
}

const userModel = new UserModel();

export { userModel };
