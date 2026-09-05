const express = require('express');
const router = express.Router();
// const Order = require('../models/Order');


const orderCtrl = require('../controller/order.controller');

router.post('/', orderCtrl.createOrder);
router.get('/', orderCtrl.getAllOrders);


module.exports = router;