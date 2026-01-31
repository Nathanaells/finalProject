const UserService = require("../services/userService");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const access_token = await UserService.login({ email, password });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const message = await UserService.register({ username, email, password });
      res.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
