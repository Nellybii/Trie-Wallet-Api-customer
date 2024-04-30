const Customer = require('../models/customer.Model')

const findAll= async () => {
    return await Customer.findAll();
}

const createCustomer = async (customer) => {
    return await Customer.create(customer)
}

const findByEmail = async (email)=> {
    return await Customer.findOne({ where: { email } });
}

const findById = async (id) => {
    let customer=await Customer.findByPk(id);
    if (!customer){
        throw new Error('Customer not found');
    }
    return customer;
}

const updateCustomer = async (id, customerData) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return await customer.update(customerData);
}

const deleteCustomerById = async (id) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
        throw new Error('Customer not found');
    };
    await customer.destroy();
    return true;
};

module.exports = {
    findAll,
    createCustomer,
    findByEmail,
    findById,
    updateCustomer,
    deleteCustomerById,
};