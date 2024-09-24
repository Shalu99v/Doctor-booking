const Slots = require('../db/models/slots-schema');
module.exports.postSlots = async (req, res) => {
  try {
    const { date, timeFrom, timeTo, availableSlots, doctor } = req.body;

    if (!doctor) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const slots = await Slots.findOneAndUpdate(
      { date: new Date(date), doctor: doctor },
      { $push: { slots: { timeFrom, timeTo, availableSlots } } },
      { new: true, upsert: true }
    );

    res
      .status(201)
      .json({ message: 'Slots added or updated successfully', data: slots });
  } catch (e) {
    res.status(400).json({ message: 'Failed to add or update slots', e });
  }
};

module.exports.getSlots = async (req, res) => {
  try {
    const { doctor } = req.query;

    if (!doctor) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    const slots = await Slots.find({ doctor: doctor }).populate('doctor');

    if (!slots.length) {
      return res
        .status(404)
        .json({ message: 'No slots found for this doctor' });
    }

    res.status(200).json({ message: 'Success', data: slots });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch slots', error });
  }
};
module.exports.getSlotsById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    console.log(doctorId);
    const slots = await Slots.find({ doctor: doctorId });

    if (!slots.length) {
      return res
        .status(404)
        .json({ message: 'No slots found for this doctor.' });
    }

    res.status(200).json({ message: 'Success', data: slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ message: 'Failed to fetch slots', error });
  }
};

module.exports.updateSlots = async (req, res) => {
  try {
    const { date, timeFrom, timeTo, availableSlots, doctor, slotId } = req.body;

    if (!doctor) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    // Update a specific slot by slotId
    const slots = await Slots.findOneAndUpdate(
      { date: new Date(date), doctor: doctor, 'slots._id': slotId },
      {
        $set: {
          'slots.$.timeFrom': timeFrom,
          'slots.$.timeTo': timeTo,
          'slots.$.availableSlots': availableSlots,
        },
      },
      { new: true }
    );

    if (!slots) {
      return res.status(404).json({ message: 'Slot not found for update' });
    }

    res.status(200).json({ message: 'Slot updated successfully', data: slots });
  } catch (e) {
    res.status(400).json({ message: 'Failed to update slot', e });
  }
};

module.exports.deleteSlots = async (req, res) => {
  try {
    const { date, timeFrom, doctor } = req.body;

    if (!doctor || !date || !timeFrom) {
      return res
        .status(400)
        .json({ message: 'Doctor ID, date, and timeFrom are required' });
    }

    // Find the slot by date, doctor, and timeFrom and remove it
    const updatedSlots = await Slots.findOneAndUpdate(
      { date: new Date(date), doctor: doctor },
      {
        $pull: { slots: { timeFrom: timeFrom } }, // Pull out the slot with the specified timeFrom
      },
      { new: true }
    );

    if (!updatedSlots) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res
      .status(200)
      .json({ message: 'Slot deleted successfully', data: updatedSlots });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete slot', error });
  }
};
