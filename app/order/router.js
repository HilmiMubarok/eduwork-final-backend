const router = require('express').Router();
const orderController = require('./controller');
const { police_check } = require('../../middlewares');

router.get(
  '/orders', 
  police_check('view', 'Order'),
  orderController.index);

router.post(
  '/orders', 
  police_check('create', 'Order'),
  orderController.store
  );
// router.put('/delivery-addresses/:id', deliveryAddressController.update);
// router.delete('/delivery-addresses/:id',  deliveryAddressController.destroy);
// 

module.exports = router;
