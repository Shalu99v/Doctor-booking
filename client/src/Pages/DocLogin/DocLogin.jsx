import './DocLogin.css';
import { Input, Button, notification } from 'antd';
import axios from '../../utils/axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const DocLogin = () => {
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  console.log(login);
  const onTogglePassword = () => {
    setShowPassword(!showpassword);
  };
  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('/doctor/login', login);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('role', response.data.role);


      notification.success({
        message: 'Success',
        description: 'Login successful !!!',
      });
      navigate('/doctor/home');
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
    <div className="loginMain_page">
      <div className="doc_login_form">
        <h1>Doctor Login</h1>
        <label>Email</label>
        <Input
          className="inputClasses"
          onChange={e => onChange(e, 'email')}
          placeholder="Enter your email address..."
        />
        <label>Password</label>
        <div className="input_div" style={{ position: 'relative' }}>
          <Input
            type={showpassword ? 'text' : 'password'}
            className="inputClasses"
            onChange={e => onChange(e, 'password')}
            placeholder="password"
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
        <div className="login_btnDiv">
          <Button onClick={onLogin}>Log In</Button>
        </div>
        <p>Or</p>
        <p>
          Don't have an account ?{' '}
          <NavLink to="/doctor/signup">
            <span className="signup-text">Sign up</span>
          </NavLink>{' '}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DocLogin;
