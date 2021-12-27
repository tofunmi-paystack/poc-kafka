const express = require('express');
const router = express.Router();

const { TransactionController } = require('../controllers/TransactionController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.patch('/transactions/:transactionId', TransactionController.update);
router.put('/transactions/:transactionId/cancel', TransactionController.cancel);

module.exports = router;
