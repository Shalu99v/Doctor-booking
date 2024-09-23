const express = require('express');
const controllers = require('../controllers/doctor-controller');
const upload = require('../middlewares/upload');
const checkToken = require('../middlewares/checkToken');
const router = express.Router();

router.post('/signup', upload.single('image'), controllers.signupDoctor);
router.post('/login', controllers.loginDoctor);
router.get('/:id', checkToken('DOCTOR'), controllers.getDoctorbyId);
router.post('/doctor/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Construct the image URL
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
