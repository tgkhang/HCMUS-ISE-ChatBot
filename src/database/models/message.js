'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Chat,{
        foreignKey: 'chatId',
        as: 'message',
      })
    }
  }
  Message.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Chats', 
        key: 'id', 
      },
      onDelete: 'CASCADE',
    },
    type:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};