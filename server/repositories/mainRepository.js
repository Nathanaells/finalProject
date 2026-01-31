const { history } = require("../models");

class MainRepository {
  static async createHistory(payload) {
    try {
      const record = await history.create(payload);
      return record;
    } catch (error) {
      throw error;
    }
  }

  static async getHistoriesByUser(userID) {
    try {
      const records = await history.findAll({
        where: { userID },
        order: [["createdAt", "DESC"]],
      });
      return records;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MainRepository;
