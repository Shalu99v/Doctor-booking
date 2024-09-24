import './UserSidebar.css'; // Create a separate CSS file for user sidebar styles
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notification, Avatar } from 'antd';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    image: '',
  });
  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    notification.success({
      message: 'Success',
      description: 'Logged out successfully!',
    });
    navigate('/user/login');
  };

  const getUserProfile = async () => {
    const userID = localStorage.getItem('ID');
    const response = await axios.get(`/user/getprofile/${userID}`);
    setUser(response.data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  // Extract initials from the user's first and last names
  const getUserInitials = () => {
    const { firstName, lastName } = user;
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';

    // If there's only a first name, return the first initial; otherwise return both initials
    return `${firstInitial}${lastInitial}` || firstInitial;
  };

  return (
    <div className="user-sidebar">
      <NavLink to="/user/profile" className="links">
        <div className="user_card">
          {user.image ? (
            <Avatar src={user.image} size={45} />
          ) : (
            <Avatar size={45}>{getUserInitials()}</Avatar>
          )}
          <div className="details">
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            {/* <h4>{`${user.age}/${user.gender}`}</h4> */}
          </div>
        </div>
      </NavLink>

      <div className="menus">
        <NavLink
          to="/user/home"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to="/user/my-appointments"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>My Appointments</p>
        </NavLink>
        <NavLink
          to="/user/find-doctors"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <p>Find Doctors</p>
        </NavLink>

        <p onClick={onLogOut}>Logout</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserSidebar;
