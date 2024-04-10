// LoginOptions.jsx
import Auth from '../../Pages/Auth/Auth';
import React from 'react';
// import { Link, useHistory } from 'react-router-dom';
import './LoginOptions.css';
import { useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { login } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import OtpLogin from './OtpLogin';
import RegisterForm from './RegisterForm';
// import { generateClientId } from '../../api/index.js'; 
// import { fetchClientId } from '../../actions/auth.js';

const clientId = "213856644921-ahs2sduhhb9c4b9vnpkp39ntqh29463a.apps.googleusercontent.com";

const LoginOptions = ({setShowLoginOptions,setEditCreateChanelBtn}) => {

  const [AuthBtn, setAuthBtn] = useState(false); 
  const [otpLogin, setOtpLogin] = useState(false);
  const [ShowRegister, setShowRegister] = useState(false);
  const [showLoginOptions, setShowLoginOptionsState] = useState(true);

  // const [clientId, setClientId] = useState('');

//   useEffect(() => {
//     // Fetch the client ID dynamically from the backend
//     const fetchClientIdFromBackend = async () => {
//         try {
//             const clientId = await dispatch(fetchClientId());
//             setClientId(clientId);
//         } catch (error) {
//             console.error('Error fetching client ID:', error);
//         }
//     };
//     fetchClientIdFromBackend();
// }, [dispatch]);

  const CurrentUser = useSelector(state => state.currentUserReducer);
  console.log(CurrentUser);

    useEffect(() => {
      console.log("CurrentUser:", CurrentUser);
      console.log("Email:", CurrentUser?.result?.email);
      console.log("Joined On:", CurrentUser?.result?.joinedOn);
      function start() {
        gapi.client.init({
          clientId: clientId,
          scope: "email"
        });
      }
      if (clientId) {
        // Initialize Google API only if clientId is available
        gapi.load('client:auth2', start);
      }
    }, [CurrentUser, clientId]);
  
    const dispatch = useDispatch();

    useEffect(() => {
      function start() {
        gapi.load('auth2', () => {
          gapi.auth2.init({
            client_id: clientId,
            scope: 'email'
          });
        });
      }
  
      if (clientId) {
        start();
      }
    }, [clientId]);
  
    const onSuccess = (response) => {
      // const tokenId = response.tokenId;
      const Email = response?.profileObj.email;
      console.log(Email);
      setAuthBtn(true);
      dispatch(login({ email: Email }))
      setShowLoginOptions(false);
    }
  
    const onFailure = (response) => {
      console.log("Failed", response);
    }

    const handleOtpVerificationSuccess = () => {
      setOtpLogin(false); // Hide OTP login component
      setShowLoginOptions(false);
    };
  
    // if (CurrentUser?.result) {
    //   // If user is logged in, return null to prevent rendering of LoginOptions
    //   return null;
    // }

    useEffect(() => {
      if (CurrentUser?.result) {
        // If user is logged in, hide the login options
        setShowLoginOptionsState(false);
      }
    }, [CurrentUser]);

  return (
    <>
    { showLoginOptions && (
      <>
      <div className="overlay" onClick={() => setShowLoginOptions(false)}></div>
      <div className="login-options-container">
        <button className="close-button" onClick={() => setShowLoginOptions(false)}>&times;</button>
        <h2>YourTube Login</h2>
        <p>Choose how you want to log in:</p>

        <div className="login-options">
        {!otpLogin && (
            <button onClick={() => setOtpLogin(true)} className="login-option phone-login">
              Login with Mobile Number
            </button>
          )}
          <div className="Auth_cont_Navbar">
          {CurrentUser?.result ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setShowLoginOptions(true)}>
                <p className="fstChar_logo_App">
                  {
                    CurrentUser?.result?.email
                      ? CurrentUser?.result.email.charAt(0).toUpperCase()
                      : "Guest"
                  }
                </p>
              </div>
            </>
          ) : (
            <>
                {!otpLogin && !ShowRegister &&(
                  <GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick} className="login-option google-login">
                        Login with Google
                      </button>
                    )}
                  />
                )}
                {AuthBtn && <Auth setAuthBtn={setAuthBtn} setEditCreateChanelBtn={setEditCreateChanelBtn} User={CurrentUser} />}
                {!AuthBtn && otpLogin && <OtpLogin />}
              </>
          )}
        </div>
      </div>
      {!otpLogin && !ShowRegister &&(
          <div className="register-link">
            <p>Don't have an account? <button onClick={() => { setShowRegister(true); setOtpLogin(false); }}>Register</button></p>
          </div>
        )}
      {
        AuthBtn && (
          <Auth
            setAuthBtn={setAuthBtn}
            setEditCreateChanelBtn={setEditCreateChanelBtn}
            User={CurrentUser}
          />
        )
      }
      {otpLogin && (
          <OtpLogin 
          setOtpLogin={setOtpLogin}
          handleLoginSuccess={() => {
            setShowLoginOptions(false); // Hide LoginOptions component
          }} 
          setShowLoginOptions={setShowLoginOptions}
          handleOtpVerificationSuccess={handleOtpVerificationSuccess} />
      )}
      
      {ShowRegister && (
         <RegisterForm setShowRegister={setShowRegister} setShowLoginOptions={setShowLoginOptions} />
      )}
      </div>
      </>
    )}
    </>
  );
};
export default LoginOptions;