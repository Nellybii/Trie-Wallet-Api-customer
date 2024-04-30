const customerService = require('../services/customer.Service')
const createCustomer = async (req, res) => {
  try {
    const { firstname, lastname, nationality, nationalId, email, phone, age } = req.body;

    if (!firstname || !lastname || !nationality || !nationalId || !email || !phone || !age) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // const existingCustomer = await Customer.findOne({
    //   where:[
    //     { email: email } || { nationalId: nationalId } || { phone: phone }
    //   ]
    // });

    // if (existingCustomer) {
    //   const existingFields = [];
    //   if (existingCustomer.email === email) existingFields.push('email');
    //   if (existingCustomer.nationalId === nationalId) existingFields.push('nationalId');
    //   if (existingCustomer.phone === phone) existingFields.push('phone');
    //   return res.status(403).json({
    //     message: `The following field(s) already exist: ${existingFields.join(', ')}.`
    //   });
    // }

    const customerData = customerService.createCustomer(req.body)
    res.status(200).json({modules: 'Customer created successfully', customer: customerData});
  } catch (error) {
    res.status(400).json({ message: 'Internal Server Error', error: error.message });
  }
};



// get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();

    res.status(200).json(customers); 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await customerService.getCustomerById(id)

    res.status(200).json(customer); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updateCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await customerService.updateCustomer(id, req.body)
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    let customer =await customerService.deleteCustomer(id);
    res.status(204).json({ message: 'Customer deleted succesfully' });
    return customer;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById
};