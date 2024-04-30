const customerRepository = require('../repositories/customer.Repository');

const getCustomers = async () => {
    return await customerRepository.findAll();
};

const createCustomer = async (customerData) => {
    const { email } = customerData;
    const existingCustomer = await customerRepository.findByEmail(email);
    if (existingCustomer) {
        throw new Error('Customer with this email already exists!');
    }
    return await customerRepository.createCustomer(customerData);
};

const getCustomerById = async (id) => {
    return await customerRepository.findById(id);
};

const updateCustomer = async (id, customerData) => {
    const { email } = customerData;
    const existingCustomer = await customerRepository.findByEmail(email);
    if (existingCustomer && existingCustomer.id !== id) {
        throw new Error('Customer with this email already exists!');
    }
    return await customerRepository.update(id, customerData);
};

const deleteCustomer = async (id) => {
    await customerRepository.deleteCustomerById(id);
};

module.exports = {
    getCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
