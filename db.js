const express = require("express");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5431/postgres');
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize, DataTypes };