const express = require('express');
const router = express.Router();
const customerController = require("../src/controllers/customer.Controller")

// Define routes
router.get('/customers', customerController.getAllCustomers); 
router.post('/customers', customerController.createCustomer);
router.get('/customer/:id', customerController.getCustomerById,);  
router.put('/customer/:id', customerController.updateCustomerById,); 
router.delete('/customer/:id', customerController.deleteCustomerById,); 

module.exports = router;
