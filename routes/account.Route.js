const express = require('express');
const router = express.Router();
const authenticateToken = require("../src/middleware")
const accountRouter = require('../src/controllers/accounts.Controler')

router.get('/account', authenticateToken, accountRouter.getAccounts)
router.get('/account/:id', authenticateToken, accountRouter.getAccountById)
router.post('/account', authenticateToken, accountRouter.createAccount)
router.put('/account', authenticateToken, accountRouter.updateAccount)
router.delete('/account/:id', authenticateToken, accountRouter.deleteAccountById)

module.exports = router;