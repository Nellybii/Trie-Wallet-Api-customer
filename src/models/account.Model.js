const { sequelize, DataTypes } = require('../../db');

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[0-9]{10}$/
        }
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_status: {
        type: DataTypes.ENUM('active', 'closed', 'frozen'),
        allowNull: false,
        defaultValue: 'active'
    },
    actual_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0 
    },
    current_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    CustomerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
        }
      }
});

Account.associations = function (models){
    Account.hasOne(models.customers, { foreignKey: 'customerId' });
    }

module.exports = Account;
