import React, { useState,useEffect } from 'react';
import axios from '../../utils/axios';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed data
import './UserBookings.css';
import UserSidebar from '../../components/Sidebar/UserSidebar';

const UserBookings = ({ userId }) => {
    const location = useLocation(); // Get location to access state
    const { doctorId, hospitalId, departmentId } = location.state || {};
    console.log(doctorId,"doctorId")
    console.log(hospitalId,"hospitalId")
    console.log(departmentId,"departmentId")

    

    const [formData, setFormData] = useState({
      doctorId,
      hospitalId,
      departmentId,
      date: '',
      time: '',
    });
  
    const [doctorName, setDoctorName] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
  
    useEffect(() => {
      const  fetchNames= async() =>{
        try {
          const response = await axios.get(`/api/doctors/${doctorId}`);
          setDoctorName(response.data.name);
  
          const hospitalResponse = await axios.get(`/api/hospitals/${hospitalId}`);
          setHospitalName(hospitalResponse.data.name);
  
          const departmentResponse = await axios.get(`/api/departments/${departmentId}`);
          setDepartmentName(departmentResponse.data.name);
        } catch (error) {
          console.error(error);
        }
      }
      fetchNames();
    }, [doctorId, hospitalId, departmentId]);
  
    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `/user/book-appointment/${userId}`,
          formData
        );
        alert(response.data.message); // Show success message
      } catch (error) {
        alert('Error booking appointment');
        console.error(error);
      }
    };
  
    return (
      <div className="home">
        <UserSidebar />
        <div className="home-container">
          <div className="form-container">
            <h1>Book Appointment</h1>
            <form onSubmit={handleSubmit}>
              <p>Doctor: {doctorName}</p>
              <p>Hospital: {hospitalName}</p>
              <p>Department: {departmentName}</p>
              <div className="inputDivs">
              <input type="date" name="date" onChange={handleChange} required />
              <input type="time" name="time" onChange={handleChange} required />
              </div>
              
              <button type="submit">Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default UserBookings;
