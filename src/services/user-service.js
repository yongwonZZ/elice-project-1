import { userModel } from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserById(id) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('유저가 없습니다.');
    }
    const { email, fullName, phoneNumber, address } = user;
    return { email, fullName, phoneNumber, address };
  }

  async addUser(userInfo) {
    const { email, fullName, password, phoneNumber, address } = userInfo;

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { fullName, email, phoneNumber, address, password: hashedPassword };
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    return { token };
  }

  async getUsers({ page, perPage }) {
    try {
      const users = await this.userModel.findAll({ page, limit: perPage });
      
      const totalUsers = await this.userModel.countDocuments({});
      return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / perPage),
      };
    } catch (error) {
      throw new Error(`사용자 목록 조회 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  async countUsers() {
    const count = await this.userModel.countDocuments({});
    return count;
  }

  async setUser(userInfoRequired, toUpdate) {
    const { userId, currentPassword } = userInfoRequired;
    let user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const { password } = toUpdate;
    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    const { email, fullName } = user;
    return { email, fullName };
  }

  async deleteUser(userId) {
    const deletedUser = await this.userModel.deleteUser(userId);
    if (!deletedUser) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    return deletedUser;
  }
}

const userService = new UserService(userModel);

export { userService };