const MainService = require("../services/mainService");

class MainController {
  static async chat(req, res, next) {
    try {
      const userID = req.user?.id;
      const { prompt } = req.body;
      const { result } = await MainService.chat({
        userID,
        prompt,
      });
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getHistories(req, res, next) {
    try {
      const userID = req.user?.id;
      const histories = await MainService.getHistories(userID);
      res.status(200).json({ histories });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MainController;
