const mongoose = require('mongoose');

const timeSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  timeFrom: {
    type: String,
    trim: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
    trim: true,
  },
});


const slotSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    slots: [timeSchema], 
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slots = mongoose.model('Slots', slotSchema);
module.exports = Slots;
