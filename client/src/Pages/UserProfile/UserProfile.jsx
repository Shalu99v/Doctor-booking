import React, { useEffect, useState } from 'react';
import UserSidebar from '../../components/Sidebar/UserSidebar';
import './UserProfile.css';
import axios from '../../utils/axios';
import {Avatar} from 'antd'

const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phno: '',
        age: '',
        gender: '',
        image: '',
      });
        const userId = localStorage.getItem('ID'); // Replace with actual user ID
console.log(userId,"userids")
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await  axios.get(
          `http://localhost:8000/user/getprofile/${userId}`
        );
        console.log(response, 'user_response');
        setUser(response.data)
        // if (response.ok) {
        //   const data = await response.json();
        //   setUser(data);
        // } else {
        //   console.error('Failed to fetch user profile');
        // }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);
  const getUserInitials = () => {
    const { firstName, lastName } = user;
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';

    // If there's only a first name, return the first initial; otherwise return both initials
    return `${firstInitial}${lastInitial}` || firstInitial;
  };


  return (
    <div className="home">
      <UserSidebar />
      <div className="home-container">
        <h1>User Profile</h1>
        <div className="profile_avatr">
        {user ? (
          <div className="profile">
            <p>
              <strong>Name:</strong> {`${user.firstName} ${user.lastName}`}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phno}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
           
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
         <div className="avatarDiv">
            {user.image ? (
            <Avatar src={user.image} size={60} />
          ) : (
            <Avatar size={100}>{getUserInitials()}</Avatar>
          )}
            </div>
        </div>
     
      </div>
    </div>
  );
};

export default UserProfile;
