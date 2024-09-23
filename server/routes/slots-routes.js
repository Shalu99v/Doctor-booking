const express = require('express');
const controllers = require('../controllers/slots-controller');
// const upload = require('../middlewares/upload');
const checkToken= require('../middlewares/checkToken')

const router = express.Router();

router.post('/', checkToken('DOCTOR'),controllers.postSlots);
router.get('/', checkToken('DOCTOR'),controllers.getSlots);
router.get('/:id', checkToken('DOCTOR'),controllers.getSlotsById);
router.patch('/:slotId', controllers.updateSlots);
router.delete('/:id',controllers.deleteSlots);




module.exports = router;
