const accountService = require('../services/account.Service');

const getAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createAccount = async (req, res) => {
    try {
        const {
            account_name,
            account_type,
            account_status,
            actual_balance,
            current_balance,
            CustomerId
        } = req.body;
        console.log(req.body);

        const accountData = await accountService.createAccount(req.body);
        res.status(201).json({ message: 'Account created successfully', account: accountData });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAccountById = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await accountService.getAccountById(id);
        if (!account) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAccount = async (req, res) => {
    const { id } = req.params;

    try {
        let account = await accountService.updateAccount(id, req.body);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAccount = await accountService.deleteAccountById(id);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    getAccountById,
    deleteAccountById
};
