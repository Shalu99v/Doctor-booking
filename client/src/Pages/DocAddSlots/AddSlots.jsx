import React, { useState } from 'react';
import {
  DatePicker,
  TimePicker,
  InputNumber,
  Button,  
  Form,
  notification,
} from 'antd';
import axios from '../../utils/axios';
import './AddSlots.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const BookingForm = () => {
  const [date, setDate] = useState(null);
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);
  const [slots, setSlots] = useState(0);

  const handleDateChange = date => {
    setDate(date);
  };

  const handleTimeFromChange = time => {
    setTimeFrom(time);
  };

  const handleTimeToChange = time => {
    setTimeTo(time);
  };

  const handleSlotsChange = value => {
    setSlots(value);
  };

  const slotClick = async () => {
    if (!date || !timeFrom || !timeTo || slots === 0) {
      notification.error({
        message: 'Error',
        description: 'Please fill all the fields before submitting.',
      });
      return;
    }

    const formattedDate = date.format('YYYY-MM-DD');
    const formattedTimeFrom = timeFrom.format('HH:mm');
    const formattedTimeTo = timeTo.format('HH:mm');

    const data = {
      date: formattedDate,
      timeFrom: formattedTimeFrom,
      timeTo: formattedTimeTo,
      availableSlots:slots,
      doctor: localStorage.getItem('ID')
    };

    console.log(data, 'data');

    try {
      const token = localStorage.getItem('token');
      console.log(token,"tokens")
      const response = await axios.post('/slots', data,
      //    {
      //   headers: {
      //     Authorization: `Bearer ${token}` 
      //   }
      // }
    );
      console.log(response.data, 'slotsData');
      notification.success({
        message: 'Success',
        description: 'Slots availability submitted successfully!',
      });
      setDate(null);
      setTimeFrom(null);
      setTimeTo(null);
      setSlots(0)
    } catch (error) {
      console.log(error,"errors");
      notification.error({
        message: 'Error',
        description: 'Failed to submit slots availability. Please try again later.',
      });
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <h1>Add Slots</h1>
        <Form layout="vertical" className="booking-form">
          <Form.Item label="Select Date" className="form-item">
            <DatePicker
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              className="date-picker"
              value={date}
            />
          </Form.Item>
          <Form.Item label="Time From" className="form-item">
            <TimePicker
              onChange={handleTimeFromChange}
              format="HH:mm"
              className="time-picker"
              value={timeFrom}
            />
          </Form.Item>
          <Form.Item label="Time To" className="form-item">
            <TimePicker
              onChange={handleTimeToChange}
              format="HH:mm"
              className="time-picker"
              value={timeTo}
            />
          </Form.Item>
          <Form.Item label="Number of Slots" className="form-item">
            <InputNumber
              min={1}
              value={slots}
              onChange={handleSlotsChange}
              className="input-number"
            />
          </Form.Item>
          <Form.Item className="form-item">
            <Button type="primary" onClick={slotClick} className="submit-button">
              Submit Slots Availability
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
