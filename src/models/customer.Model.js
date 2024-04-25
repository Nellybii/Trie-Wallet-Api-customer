//const express = require('express');
const { sequelize, DataTypes } = require('../../db');
// const { Sequelize, DataTypes } = require('sequelize');

const Customer = sequelize.define('customers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

Customer.associations = (models) => {
  Customer.hasMany(models.    Account, {
    foreignKey: 'accountId',
    as: 'accounts',
  });
}

module.exports = Customer;

