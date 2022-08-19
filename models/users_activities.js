'use strict';
const {
  Model
} = require('sequelize');

const{Users,Activities} = require('./');
module.exports = (sequelize, DataTypes) => {
  class Users_Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Activities}) {
      this.belongsTo(Users,{foreignKey:'userId',as:'users'});
      this.belongsTo(Activities,{foreignKey:'activityId',as:'activities'});
    }
  };
  Users_Activities.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },

    activityId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Users_Activities',
  });
  return Users_Activities;
};