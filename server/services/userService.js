const { verifyPassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const UserRepository = require("../repositories/userRepository");

class UserService {
  static async login(payload) {
    try {
      const { email, password } = payload;

      if (!email || !password) {
        throw {
          name: "ValidationError",
          message: "Email and password required",
        };
      }

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw { name: "UnauthorizedError", message: "Invalid credentials" };
      }

      const isPasswordValid = verifyPassword(password, user.password);

      if (!isPasswordValid) {
        throw { name: "UnauthorizedError", message: "Invalid credentials" };
      }

      const access_token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      return access_token;
    } catch (error) {
      throw error;
    }
  }

  static async register(payload) {
    try {
      const { username, email, password } = payload;

      if (!username || !email || !password) {
        throw {
          name: "ValidationError",
          message: "Username, email and password are required",
        };
      }

      const existingEmail = await UserRepository.findByEmail(email);
      if (existingEmail) {
        throw { name: "ValidationError", message: "Email already registered" };
      }

      const existingUsername = await UserRepository.findByUsername(username);
      if (existingUsername) {
        throw { name: "ValidationError", message: "Username already taken" };
      }

      const hashed = hashPassword(password);
      const user = await UserRepository.createUser({
        username,
        email,
        password: hashed,
      });

      const response = {
        message: "User registered successfully",
        status: 201,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
