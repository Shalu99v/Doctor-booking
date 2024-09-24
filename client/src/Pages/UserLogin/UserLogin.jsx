import './UserLogin.css';
import { useState } from 'react';
import { Input, Button, notification } from 'antd';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "../../utils/axios"

const UserLogin = () => {
    const navigate= useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  console.log(userLogin, 'userLogin');
  const onTogglePassword = () => {
    setShowPassword(!showpassword);
  };
  const onChange = (e, key) => {
    setUserLogin({ ...userLogin, [key]: e.target.value });
  };
  const onUserLogin = async () => {
    try {
      const response = await axios.post('/user/login', userLogin);
      console.log(response,"response")
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('role', response.data.token);


      notification.success({
        message: 'Success',
        description: 'Login successful !!!',
      });
      navigate('/user/home');
    } catch (e) {
        if (e.response && e.response.status === 403) {
            notification.error({
              message: 'Failed!!',
              description: e.response.data.message,
            });
          } else {
            notification.error({
              message: 'Error',
              description: 'Something went wrong. Please try again later.',
            });
          }
    }
  };
  return (
    <div className="userLogin_main">
      <Button className='homeBtn' onClick={()=>navigate("/")}>Home</Button>
      <div className="user_login_form">
        <h1>User Login</h1>
        <label>Email</label>
        <Input
          className="input_classes"
          placeholder="Enter your email address..."
          onChange={e => onChange(e, 'email')}
        />
        <label>Password</label>
        <div className="input_div" style={{ position: 'relative' }}>
          <Input
            type={showpassword ? 'text' : 'password'}
            className="input_classes"
            placeholder="password"
            onChange={e => onChange(e, 'password')}
          />
        </div>
        <div className="passIcon" onClick={onTogglePassword}>
          {showpassword ? (
            <IoEyeOutline size={20} color="grey" />
          ) : (
            <IoEyeOffOutline size={20} color="grey" />
          )}
        </div>
        <div className="rem_frgt">
          <div className="check_rem">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <div className="frgtPass">
            <p>Forgot password?</p>
          </div>
        </div>
        <div className="user_login_btnDiv">
          <Button onClick={onUserLogin}>Log In</Button>
        </div>
        <p>Or</p>
        <p>
          Don't have an account ?{' '}
          <NavLink to="/user/signup">
            <span className="signup-text">Sign up</span>
          </NavLink>{' '}
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
