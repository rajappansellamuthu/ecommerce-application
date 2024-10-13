const express = require('express');
const { createOrder, getOrderById, getOrdersByUserId } = require('../controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
router.get('/:id', getOrderById);
router.get('/user/:id', getOrdersByUserId);

module.exports = router;
