const Account = require('../models/account.model'); 

const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
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
            account_number,
            account_status,
            actual_balance,
            current_balance
        } = req.body;
        const missingFields=[]
        if (!account_name || !account_number || !account_status || !actual_balance || !current_balance) {
            missingFields.push('account_name');
            missingFields.push('account_type');
            missingFields.push('account_number');
            missingFields.push('account_status');
            missingFields.push('actual_balance');
            missingFields.push('current_balance');
        }


        const existingAccount = await Account.findOne({ where: { account_number } });
    
        if (existingAccount) {
            const existingFields = []
            if (existingAccount.account_name === account_name) existingFields.push('account_name');
            return res.status(403).json({ message: 'Account with this account_number already exists!' });
        }

        const newAccount = await Account.create({
            account_name,
            account_type,
            account_number,
            account_status,
            actual_balance,
            current_balance
        });

        return res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAccountById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const account = await Account.findByPk(id);
  
      if (!account) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json(account); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const updateAccount = async (req, res) => {
    const { id } = req.params;
    const {
        account_name,
        account_type,
        account_number,
        account_status,
        actual_balance,
        current_balance
    } = req.body;

    try {
        let account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        account = await account.update({
            account_name,
            account_type,
            account_number,
            account_status,
            actual_balance,
            current_balance
        });

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

   

const deleteAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        await account.destroy();
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    getAccountById,
    deleteAccountById
};
