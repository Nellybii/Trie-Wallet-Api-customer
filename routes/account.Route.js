const express = require('express');
const router = express.Router();

const accountRouter = require('../src/controllers/accounts.Controler')

router.get('/account', accountRouter.getAccounts)
router.get('/account/:id', accountRouter.getAccountById)
router.post('/account', accountRouter.createAccount)
router.put('/account', accountRouter.updateAccount)
router.delete('/account/:id', accountRouter.deleteAccountById)

module.exports = router;