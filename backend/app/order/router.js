const router = require('express').Router();
const orderController = require('./controller');

router.post('/order', orderController.store);
router.get('/order', orderController.index);
router.put('/order/:id', orderController.update);
router.delete('/order/:id', orderController.destroy);
router.get('/addOrder_collection', orderController.addOrder);

module.exports = router;