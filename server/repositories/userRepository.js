const { User } = require("../models");

class UserRepository {
  static async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const user = await User.findOne({ where: { username } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(payload) {
    try {
      const user = await User.create(payload);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
