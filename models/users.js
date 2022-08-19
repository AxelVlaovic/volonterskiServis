'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({User_Suggestions,Activities,Users_Activities}) {
        this.hasMany(User_Suggestions,{foreignKey: 'userId',as:'user_suggestions',onDelete:'cascade',hooks:true});
      }
  };
  Users.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    surname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true         
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true      
    },
    gender: {
      type:DataTypes.STRING,
      allowNull:false
    },
    isAdmin: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    isModerator: {
      type:DataTypes.BOOLEAN,       
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};