'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    id: DataTypes.UUID,
    account_name: DataTypes.STRING,
    account_number: DataTypes.STRING,
    account_type: DataTypes.STRING,
    account_status: DataTypes.STRING,
    actual_balance: DataTypes.DECIMAL,
    current_balance: DataTypes.DECIMAL
    
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};