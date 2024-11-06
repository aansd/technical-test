const router = require('express').Router();
const categoryController = require('./controller');

router.get('/categories', categoryController.index);
router.post('/categories', categoryController.store);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.destroy);
router.get('/addCategories_Collection', categoryController.addCategory);
module.exports = router;