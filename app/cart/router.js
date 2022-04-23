const router = require('express').Router();
const cartController = require('./controller');
const { police_check } = require('../../middlewares');


router.get(
  '/carts', 
  police_check('read', 'Cart'),
  cartController.index
);

// router.post(
//   '/delivery-addresses', 
//   police_check('create', 'deliveryAddress'),
//   deliveryAddressController.store
//   );
router.put(
  '/carts', 
  police_check('update', 'Cart'),
  cartController.update
);

// router.delete('/delivery-addresses/:id',  deliveryAddressController.destroy);


module.exports = router;
