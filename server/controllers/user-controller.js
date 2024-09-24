const User = require('../db/models/user-schema');
const Doctor = require('../db/models/doctor-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Department = require('../db/models/department-schema');
const Hospital = require('../db/models/hospital-schema');
const Appointment = require('../db/models/appointment-schema'); 

module.exports.signupUsers = async (req, res) => {
  try {
    const { body } = req;
    const users = await User.findOne({ email: body.email });
    if (users) {
      return res.status(403).json({ message: 'Email already taken' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: "Password doesn't match" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    console.log(newUser);
    res.status(201).json({ message: 'Account created', data: newUser });
  } catch (e) {
    res.status(400).json(e);
  }
};
module.exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ message: 'Email or Password incorrect' });
    }
    const isMatching= await bcrypt.compare(password,user.password);
    if(!isMatching){
      return res.status(403).json({message: "Email or Password incorrect"})
    }
    const token= jwt.sign({id: user._id,role: "USER"},process.env.SECRET_KEY, {expiresIn:'7d'});
    res.status(200).json({message:"You are Logged In !!!", token: token, id:user._id})
  } catch (e) {
    res.status(400).json(e);
  }
};
module.exports.getUserbyId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }

};
// Get user profile
module.exports.getUserProfile = async (req, res) => {
  try {
    const {userId} = req.params; // Assuming the user ID is decoded from the JWT token in a middleware
    console.log(userId)
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e });
  }
};

// Update user profile
module.exports.updateUserProfile = async (req, res) => {
  const allowedUpdates = ['name', 'email', 'phno', 'age', 'gender'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  try {
    const {userId} = req.params; // Assuming the user ID is decoded from the JWT token in a middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e });
  }
};




// Inside your searchEntities function:
module.exports.searchEntities = async (req, res) => {
  try {
    const query = req.query.q;

    // Fetch doctors, hospitals, and departments based on query
    const doctors = await Doctor.find({
      $or: [
        { firstName: new RegExp(query, 'i') },
        { lastName: new RegExp(query, 'i') }
      ]
    }).populate('hospital').populate('department');

    const hospitals = await Hospital.find({
      name: new RegExp(query, 'i')
    }).populate('departments');

    const departments = await Department.find({
      name: new RegExp(query, 'i')
    }).populate('doctors').populate('hospitals');

    // Send response
    res.status(200).json({
      doctors,
      hospitals,
      departments,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
};



module.exports.bookAppointment = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed in params or extracted from token
    const { doctor, hospital, department, date, time } = req.body;

    // Validate input
    if (!doctor || !hospital || !department || !date || !time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      user: userId,
      doctor,
      hospital,
      department,
      date,
      time
    });

    // Save the appointment
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

module.exports.getAllAppoinments = async(req,res)=>{
  try
  {
const Allappointments = await Appointment.find()
res.status(200).json({message:"All Apppointments",data:Allappointments})
  }

  catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
}

// Book an appointment
// module.exports.bookAppointmentById= async (req, res) => {
//   const {userId} = req.params;
//   const { doctor, hospital, department, date, time } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create a new appointment
//     const newAppointment = new Appointment({
//       user: userId,
//       doctor,
//       hospital,
//       department,
//       date,
//       time,
//     });

//     // Save the appointment to the database
//     await newAppointment.save();

//     res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });




