import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register} from '../../actions/auth';
import './RegisterForm.css';
import { login } from '../../actions/auth';

const RegisterForm = ({ setShowRegister, setShowLoginOptions }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch registerUser action to store user details in the database
      await dispatch(register({ fullname, email, password, phone_number:`+${phone_number}`}));

      // Automatically login the user after registration
      dispatch(login({ email }));
      // Show alert for successful registration
      // alert('Registration successful!');

      // Close the register form and login options form
      setShowRegister(false);
      setShowLoginOptions(false);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleCloseRegisterForm = () => {
    setShowRegister(false);
    setShowLoginOptions(false);
  };

  return (
    <>
      <div className="register-form-container">
        <button className="close-button" onClick={handleCloseRegisterForm}>&times;</button>
        <h2>Register to YourTube</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number with countryCode:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          {/* Call handleSubmit function when the register button is clicked */}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
