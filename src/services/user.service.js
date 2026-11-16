const userRepository = require("../repositories/user.repository");
const { USER_ROLES } = require("../constants");
const { ERROR_CODES } = require("../constants/errors.constants");
const AppError = require("../utils/AppError");

class UserService {
  async getAll({ role } = {}) {
    if (role && !Object.values(USER_ROLES).includes(role)) {
      throw new AppError(ERROR_CODES.INVALID_ROLE);
    }
    return userRepository.findAll({ role });
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError(ERROR_CODES.USER_NOT_FOUND);
    return user;
  }

  async create({ name, email, role = USER_ROLES.USER }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new AppError(ERROR_CODES.EMAIL_EXISTS);
    return userRepository.create({ name, email, role });
  }
}

module.exports = new UserService();
