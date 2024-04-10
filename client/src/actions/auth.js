import * as api from '../api';
import { setCurrentUser } from './currentUser';
import axios from 'axios';

// export const login = (authData) =>async (dispatch) => {
//     try{
//         //console.log(authData)
//         const {data} = await api.login(authData);
//         dispatch({ type:"AUTH", data});
//         dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
//     } catch(error){
//         alert(error);
//     }
// };

// const onSuccess = (response) => {
//     const email = response?.profileObj.email;
//     console.log('Email from Google API:', email);
//     dispatch(login({ email }));
//   };

// eslint-disable-next-line no-unused-vars

// Function to fetch the client ID from the backend endpoint
// export const fetchClientId = async () => {
//   try {
//       const response = await axios.get('/user/generate-client-id');
//       return response.data.clientId;
//   } catch (error) {
//       console.error('Error fetching client ID:', error);
//       throw error;
//   }
// };

export const login = (authData) => async (dispatch) => {
    try {
      const { data } = await api.login(authData);
      console.log('Data from MongoDB:', data);
      dispatch({ type: 'AUTH', data });
      console.log("localStorage Profile:", localStorage.getItem('Profile'));
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    } catch (error) {
      alert(error);
    }
  };


// actions/auth.js

export const sendOtp = (phoneNumber) => async (dispatch) => {
  try {
    // Dispatch an action to indicate that OTP is being sent
    dispatch({ type: 'SEND_OTP_REQUEST' });

    // Call your API function to send OTP
    const response = await api.sendOtp(phoneNumber);

    // Dispatch an action with the result
    dispatch({
      type: 'SEND_OTP_SUCCESS',
      payload: response.data, // You can adjust this based on your API response
    });
  } catch (error) {
    // Dispatch an action if there's an error
    dispatch({ type: 'SEND_OTP_FAILURE', payload: error.message });
  }
};

export const verifyOtp = (phoneNumber, otp) => async (dispatch) => {
  try {
    // Dispatch an action to indicate that OTP is being verified
    dispatch({ type: 'VERIFY_OTP_REQUEST' });

    // Call your API function to verify OTP
    const response = await api.verifyOtp(phoneNumber, otp);
    // Dispatch an action with the result
    dispatch({
      type: 'VERIFY_OTP_SUCCESS',
      payload: response.data, // You can adjust this based on your API response
    });
    const email = response?.data?.email;
    if (email) {
      // If email is received, dispatch the login action with the email
      dispatch(login({ email })).then(() => {
        // Additional logic after successful login, if needed
      }).catch((error) => {
        // Handle login error
        console.error('Login failed:', error);
      });
    }
  } catch (error) {
    // Dispatch an action if there's an error
    dispatch({ type: 'VERIFY_OTP_FAILURE', payload: error.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });

    const { data } = await api.register(userData);

    dispatch({ type: 'REGISTER_SUCCESS', payload: data.message });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};