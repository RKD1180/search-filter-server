const express = require('express');
const { createProduct, getProduct, starSearch, priceLowSearch, priceHighSearch } = require('../controllers/productsControllers');
const router = express.Router();
router.route('/products').get(getProduct)
router.route('/products/create').post(createProduct)
module.exports = router;