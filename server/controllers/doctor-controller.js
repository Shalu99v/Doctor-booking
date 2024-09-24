const Doctor = require('../db/models/doctor-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupDoctor = async (req, res) => {
  try {
    const { body } = req;
    const { originalname } = req.file;
    const doctor = await Doctor.findOne({ email: body.email });

    if (doctor) {
      return res.status(403).json({ message: 'Email already taken' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: "Password doesn't match" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    body.image = `http://localhost:${process.env.PORT}/uploads/${originalname}`;

    const newDoctor = await Doctor.create(body);
    res.status(201).json({ message: 'Account Created', data: newDoctor });
  } catch (e) {
    res.status(400).json(e);
  }
};



module.exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(403).json({ message: 'Email or password incorrect' });
    }
    const isMatching = await bcrypt.compare(password, doctor.password);
    if (!isMatching) {
      return res.status(403).json({ message: 'Email or password incorrect'});
    }
    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );
    res
      .status(200)
      .json({ message: 'You are Logged In !!!', token: token, id: doctor._id });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.getDoctorbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    res.status(200).json(doctor);
  } catch (e) {
    res.status(400).json(e);
  }

};

