
const Customer = require('./models'); 

const createCustomer = async (req, res) => {
  try {
    const { firstname, lastname, nationality, nationalId, email, phone, age } = req.body;

    if (!firstname || !lastname || !nationality || !nationalId || !email || !phone || !age) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingCustomer = await Customer.findOne({
      where:[
        { email: email } || { nationalId: nationalId } || { phone: phone }
      ]
    });

    if (existingCustomer) {
      const existingFields = [];
      if (existingCustomer.email === email) existingFields.push('email');
      if (existingCustomer.nationalId === nationalId) existingFields.push('nationalId');
      if (existingCustomer.phone === phone) existingFields.push('phone');

      return res.status(403).json({
        message: `The following field(s) already exist: ${existingFields.join(', ')}.`
      });
    }

    const customer = await Customer.create({
      firstname,
      lastname,
      nationality,
      nationalId,
      email,
      phone,
      age
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    res.status(200).json(customers); 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, nationality, nationalId, email, phone, age } = req.body;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.update({
      firstname,
      lastname,
      nationality,
      nationalId,
      email,
      phone,
      age
    });

    res.status(200).json(customer); // Send back the updated customer
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a customer by ID
const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    res.status(204).json({message:'Customer deleted succesfully'}); 
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