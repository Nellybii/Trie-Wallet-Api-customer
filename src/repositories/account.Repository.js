const Account = require('../models/account.Model');

const findAll = async () => {
    return await Account.findAll();
};

const create = async (accountData) => {
    return await Account.create(accountData);
};

const findByAccountName = async (account_name) => {
    return await Account.findOne({ where: { account_name } });
};

const findById = async (id) => {
    return await Account.findByPk(id);
};

const update = async (id, accountData) => {
    const account = await Account.findByPk(id);
    if (!account) {
        throw new Error('Account not found');
    }
    return await account.update(accountData);
};

const deleteById = async (id) => {
    const account = await Account.findByPk(id);
    if (!account) return null;
    await account.destroy();
    return true;
};

module.exports = {
    findAll,
    create,
    findByAccountName,
    findById,
    update,
    deleteById
};
