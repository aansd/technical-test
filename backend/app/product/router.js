const router = require('express').Router();
const multer = require('multer');
const os = require('os');


const productController = require('./controller');

router.get('/products', productController.index);
router.post('/products', productController.store);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.destroy);
router.get('/addProducts_Collection', productController.addProduct);
module.exports = router;
