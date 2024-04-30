
const AccountRepository = require('../repositories/account.Repository');

const getAccounts = async () => {
    return await AccountRepository.findAll();
};

const createAccount = async (accountData) => {
    const { account_name } = accountData;
    const existingAccount = await AccountRepository.findByAccountName(account_name);
    if (existingAccount) {
        throw new Error('Account with this account_name already exists!');
    }
    return await AccountRepository.create(accountData);
};

const getAccountById = async (id) => {
    return await AccountRepository.findById(id);
};

const updateAccount = async (id, accountData) => {
    const account = await AccountRepository.findById(id);
    if (!account) {
        throw new Error('Account not found');
    }
    return await AccountRepository.update(id, accountData);
};

const deleteAccountById = async (id) => {
    return await AccountRepository.deleteById(id);
};

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    getAccountById,
    deleteAccountById
};
