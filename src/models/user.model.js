const { sequelize, DataTypes } = require('../../db')

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.ENUM('guest', 'customer', 'admin'),
        allowNull: false,
        defaultValue: 'guest'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports= User;