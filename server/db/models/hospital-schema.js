const mongoose = require('mongoose');

// Define the address schema
const addressSchema = mongoose.Schema({
  city: {
    type: String,
    trim: true,
  },
  pincode: Number,
  street: String,
});

// Define the hospital schema
const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: addressSchema,
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // Reference to Department schema
      },
    ],
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

// Register and export the model
const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
