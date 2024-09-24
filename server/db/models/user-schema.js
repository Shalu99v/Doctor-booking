const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // phno: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
    age: {
      type: Number,
      min: 0, // Optional: You can specify a minimum age
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'], // Optional: Define acceptable values
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
