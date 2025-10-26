import React, { useState } from 'react';
import './login.css';
//import axios from 'axios';
import axios from '../../../utils/axios';

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const [user, setUSer] = useState({ email: '', password: '' });
  const onChange = (e, key) => {
    setUSer({ ...user, [key]: e.target.value });
  };
  const onBtnClick = async e => {
    console.log('login');
    e.preventDefault();

    try {
      const response = await axios.post('/user/login', user);
      localStorage.setItem('token', response.data.token);
      const decoded = JSON.parse(atob(response.data.token.split('.')[1]));
      //console.log('log', decoded);
      localStorage.setItem('userId', decoded.user_id);
      localStorage.setItem('userName', decoded.user_name);
      localStorage.setItem('role', decoded.role);
      const role = localStorage.getItem('role');
      //console.log('username', decoded.user_name);
      if (role == 'USER') {
        navigate('/products');
      }
    } catch (e) {
      console.log(e?.response?.data?.message);
      toast.error(e?.response?.data?.message);
    }

    //console.log(response);
  };

  //sign Up form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle form input change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/signup', formData);
      alert('Registration successful!');
      console.log(response.data); // Optionally handle userId or redirect
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message); // Show backend error
      } else {
        alert('Something went wrong. Please try again.');
      }
      console.error('Registration failed:', err);
    }
  };
  return (
    <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
      {/* Sign In Panel */}
      <div className="form-container sign-in-container">
        <ToastContainer />
        <form onSubmit={onBtnClick}>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <input
            type="email"
            placeholder="Email"
            onChange={e => onChange(e, 'email')}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => onChange(e, 'password')}
          />
          <button className="auth-btn">Sign In</button>
        </form>
      </div>
      {/* Sign Up Panel */}
      <div className="form-container sign-up-container">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration:</span>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            id="conformpassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
          />
          <button className="auth-btn">Sign Up</button>
        </form>
      </div>
      {/* Overlay Panel */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h2>Welcome Back!</h2>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost auth-btn"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
            <button
              className="ghost auth-btn"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
