const express = require('express');
const { createProduct, getProductById, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/create', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);

module.exports = router;
