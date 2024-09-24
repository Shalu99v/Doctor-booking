const express = require('express');
const controllers = require('../controllers/user-controller');
// const upload = require('../middlewares/upload');
const checkToken= require('../middlewares/checkToken')

const router = express.Router();

router.post('/signup',  controllers.signupUsers);
router.post('/login', controllers.loginUsers);
router.get('/search',checkToken('USERS') ,controllers.searchEntities);
router.get('/all-appointments',checkToken('USERS'), controllers.getAllAppoinments);
router.get('/:userId',checkToken('USERS'),controllers.getUserbyId)
router.get('/getprofile/:userId', checkToken('USERS'),controllers.getUserProfile);
router.patch('/updateprofile/:userId', checkToken('USERS'),controllers.updateUserProfile);
router.post('/book-appointment/:userId',checkToken('USERS'), controllers.bookAppointment);





module.exports = router;
