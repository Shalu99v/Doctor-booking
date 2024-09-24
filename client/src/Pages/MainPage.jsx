import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/user/login'); // Navigate to user login page
  };

  const handleDoctorLogin = () => {
    navigate('/doctor/login'); // Navigate to doctor login page
  };

  return (
    <div className="main-page">
      <h1 >Welcome to the Doctor Booking App</h1>
      <p>Please choose your login type:</p>
      <div className="login-buttons">
        <button onClick={handleUserLogin} className="login-button" style={{backgroundColor:"#3B2C67"}}>User Login</button>
        <button onClick={handleDoctorLogin} className="login-button" style={{backgroundColor:"#067928"}}>Doctor Login</button>
      </div>
    </div>
  );
};

export default MainPage;
