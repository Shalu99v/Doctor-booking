import React, { useEffect, useState } from 'react';
import './DocBookings.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from '../../utils/axios';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import moment from 'moment';
import { MdOutlineCancel } from 'react-icons/md';

const Docbookings = () => {
  const [slotsData, setSlotsData] = useState([]);
  const [editingSlot, setEditingSlot] = useState({ parentId: null, index: null });
  console.log(editingSlot,"check_editslot")
  const [editedTimeFrom, setEditedTimeFrom] = useState('');
  const [editedTimeTo, setEditedTimeTo] = useState('');
  const [editedAvailableSlots, setEditedAvailableSlots] = useState('');
  const doctorId = localStorage.getItem('ID');

  useEffect(() => {
    if (doctorId) {
      const viewSlotData = async () => {
        try {
          const response = await axios.get(`/slots?doctor=${doctorId}`);
          setSlotsData(response.data.data);
        } catch (e) {
          console.log(e);
        }
      };

      viewSlotData();
    } else {
      console.error('Doctor ID not found');
    }
  }, [doctorId]);

  const handleEdit = (parentId, slotIndex, currentSlot) => {
    setEditingSlot({ parentId, index: slotIndex });
    setEditedTimeFrom(currentSlot.timeFrom);
    setEditedTimeTo(currentSlot.timeTo);
    setEditedAvailableSlots(currentSlot.availableSlots);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const doctorId = localStorage.getItem('ID'); // Get doctor ID
      const { parentId, index } = editingSlot;
    
      // Find the slot we are editing and the associated date
      const parentSlot = slotsData.find(item => item._id === parentId);
      const slotToEdit = parentSlot.slots[index];
    
      // Send the updated slot data, including slotId
      const response =await axios.patch(`/slots/${doctorId}`, {
        doctor: doctorId, // Include doctor ID in the request body
        date: parentSlot.date, // Include the date from the slot's parent
        slotId: slotToEdit._id, // Pass the slot ID to the backend
        timeFrom: editedTimeFrom, // Updated timeFrom
        timeTo: editedTimeTo, // Updated timeTo
        availableSlots: editedAvailableSlots, // Updated availableSlots
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Auth token for secure request
        }
      });
    console.log(slotId,"slotId")
    
      // Reset the editing state and refresh the page
      setEditingSlot({ parentId: '', index: '' });
      // window.location.reload(); // Reload data after saving
    } catch (error) {
      console.error('Error editing slot:', error);
    }
  };
  

  const handleDelete = async (slotId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/slots/${slotId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSlotsData(slotsData.filter(slot => slot._id !== slotId));
      console.log('Slot deleted successfully');
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <div className="availability-container">
          <h2>My Slots Availability</h2>
          <div className="slotsDetails">
            {slotsData && slotsData.length > 0 ? (
              slotsData.map(item => (
                <div key={item._id} className="card_slots">
                  <div className="card">
                    <h5>{moment(item.date).format('YYYY-MM-DD')}</h5>
                  </div>
                  {item.slots.map((slot, index) => (
                    <div key={index} className="time_slots">
                      {/* Editing Mode */}
                      {editingSlot.parentId === item._id && editingSlot.index === index ? (
                        <div className="edit-form">
                          <input
                            type="text"
                            value={editedTimeFrom}
                            onChange={(e) => setEditedTimeFrom(e.target.value)}
                            placeholder="Time From"
                          />
                          <input
                            type="text"
                            value={editedTimeTo}
                            onChange={(e) => setEditedTimeTo(e.target.value)}
                            placeholder="Time To"
                          />
                          <input
                            type="number"
                            value={editedAvailableSlots}
                            onChange={(e) => setEditedAvailableSlots(e.target.value)}
                            placeholder="Available Slots"
                          />
                          <FaSave onClick={handleSaveEdit} />
                          <MdOutlineCancel onClick={() => setEditingSlot({ parentId: null, index: null })} />
                        </div>
                      ) : (
                        <div className="slotsdeta">
                          <h5>{slot.timeFrom} - {slot.timeTo}</h5>
                          <h5>Slots: {slot.availableSlots}</h5>
                          <div className="actions">
                            <FaEdit
                              size={12}
                              className="icon edit-icon"
                              onClick={() => handleEdit(item._id, index, slot)}
                            />
                            <FaTrash
                              size={12}
                              className="icon delete-icon"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No slots available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docbookings;
