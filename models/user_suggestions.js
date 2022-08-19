'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Suggestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users,{foreignKey : 'userId', as: 'user'});
    }
  };
  User_Suggestions.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    purpose: {
      type:DataTypes.STRING,
      allowNull:false
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false
    },
    location: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User_Suggestions',
  });
  return User_Suggestions;
};