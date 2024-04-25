const express = require('express');
const router = express.Router();
const customerController = require("../src/controllers/customer.Controller")
const authenticateToken = require("../src/middleware")

// Define routes
router.get('/customers', authenticateToken, customerController.getAllCustomers); 
router.post('/customers', authenticateToken, customerController.createCustomer);
router.get('/customer/:id', authenticateToken, customerController.getCustomerById,);  
router.put('/customer/:id', authenticateToken, customerController.updateCustomerById,); 
router.delete('/customer/:id', authenticateToken, customerController.deleteCustomerById,); 

module.exports = router;
