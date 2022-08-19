'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate() {

      }
    };
  Activities.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    organisation: {               
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    time: {
      type:DataTypes.STRING,  
      allowNull:false
    },
    location: {       
      type:DataTypes.STRING,
      allowNull:false
    },
    outdoor: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    date: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Activities',
  });
  return Activities;
};