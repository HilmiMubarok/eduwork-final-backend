const router = require('express').Router();
const tagController = require('./controller');
const {police_check} = require('../../middlewares/index')


router.get('/tags', tagController.index);

router.post('/tags',  
  police_check('create', 'Tag'),
  tagController.store
);

router.put('/tags/:id',   
  police_check('update', 'Tag'),
  tagController.update
);

router.delete('/tags/:id',   
  police_check('delete', 'Tag'),
  tagController.destroy
);


module.exports = router;
