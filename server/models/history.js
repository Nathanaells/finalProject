"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    static associate(models) {
      history.belongsTo(models.User, {
        foreignKey: "userID",
      });
    }
  }
  history.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title required",
          },
          notNull: {
            msg: "Title required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description required" },
          notNull: { msg: "Description required" },
        },
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID required" },
          notEmpty: { msg: "User ID required" },
        },
      },
    },
    {
      sequelize,
      modelName: "history",
    },
  );
  return history;
};
