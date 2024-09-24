import './Sidebar.css';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { notification } from 'antd';

const Sidebar = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    email: '',
    firstName: '',
    lastName: '',
    qualification: '',
    image: '',
  });
console.log(doctor,"doctor")
  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    notification.success({
      message: 'Success',
      description: 'Logged out successfully!',
    });
    navigate('/doctor/login');
  };

  const getDocHome = async () => {
    const doctorID = localStorage.getItem('ID');
    const response = await axios.get(`/doctor/${doctorID}`);
    console.log(response,"doctorrespo")
    setDoctor(response.data);
  };

  useEffect(() => {
    getDocHome();
  }, []);

  return (
    <div className="sidebar">
      <NavLink to="/doctor/profile" className="links">
        <div className="user_card">
          <img src={doctor.image} alt="" />
          <div className="details">
            <p>{`${doctor.firstName} ${doctor.lastName}`}</p>
            <p>{doctor.qualification}</p>
          </div>
        </div>
      </NavLink>

      <div className="menu">
        <NavLink
          to="/doctor/home"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to="/doctor/bookings"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>My Bookings</p>
        </NavLink>
        <NavLink
          to="/doctor/addslots"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>Add slots</p>
        </NavLink>

        <p  className="logoutP" onClick={onLogOut}>Logout</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
