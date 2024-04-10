import React, { useState } from 'react';
import './Navbar.css';
import logo from './youtube_logo.png';
import SearchBar from './SearchBar/SearchBar';
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiUserCircle } from "react-icons/bi";
// import { useEffect } from 'react';
// import {gapi} from 'gapi-script'
import Auth from '../../Pages/Auth/Auth';
import LoginOptions from '../../Pages/Auth/LoginOptions'; // Import the LoginOptions component
import RegisterForm from '../../Pages/Auth/RegisterForm';
import OtpLogin from '../../Pages/Auth/OtpLogin';
// import { generateClientId } from '../../api/index.js'; 
// import { login } from '../../actions/auth';

// const clientId = "213856644921-ahs2sduhhb9c4b9vnpkp39ntqh29463a.apps.googleusercontent.com";

function Navbar({ toggleDrawer, setEditCreateChanelBtn}) {

  // const dispatch = useDispatch();
  const [showLoginOptions, setShowLoginOptions] = useState(false); // State to track if login options should be displayed
  const [AuthBtn, setAuthBtn] = useState(false); 
  const [showRegister, setShowRegister] = useState(false);
  const [otpLogin, setOtpLogin] = useState(false);
  // const [clientId, setClientId] = useState('');

  // useEffect(() => {
  //   generateClientId()
  //     .then(response => {
  //       console.log('Client ID:', response.data.clientId);
  //       setClientId(response.data.clientId); // Set clientId state
  //       initializeGoogleAPI(response.data.clientId); // Initialize Google API after getting clientId
  //     })
  //     .catch(error => {
  //       console.error('Error fetching client ID:', error);
  //     });
  // }, []);

  // const initializeGoogleAPI = (clientId) => {
  //   function start() {
  //     if (!window.gapi.auth2.getAuthInstance()) {
  //       window.gapi.client.init({
  //         clientId: clientId,
  //         scope: "email"
  //       }).then(() => {
  //         console.log('Google API initialized successfully');
  //       }).catch((error) => {
  //         console.error('Error initializing Google API:', error);
  //       });
  //     }
  //   }

  //   if (clientId) {
  //     // Load auth2 library from Google
  //     window.gapi.load('client:auth2', start);
  //   }
  // };
  const CurrentUser = useSelector(state => state.currentUserReducer);
  console.log(CurrentUser);


  // useEffect(() => {
  //   console.log("CurrentUser:", CurrentUser);
  //   console.log("Email:", CurrentUser?.result?.email);
  //   console.log("Joined On:", CurrentUser?.result?.joinedOn);

  //   function start() {
  //     gapi.auth2.getAuthInstance({
  //       clientId: clientId,
  //       scope: "email"
  //     });
  //   }
  //   if (clientId) {
  //     // Initialize Google API only if clientId is available
  //     gapi.load('client:auth2', start);
  //   }
  // }, [CurrentUser, clientId]);


    // Access authentication state and user profile from Redux store
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const userEmail = useSelector(state => state.auth.user.email);

  // useEffect(() => {
  //   console.log("CurrentUser:", CurrentUser);
  //   console.log("Email:", CurrentUser?.result?.email);
  //   console.log("Joined On:", CurrentUser?.result?.joinedOn);

  //   function start() {
  //     gapi.client.init({
  //       clientId: "213856644921-ahs2sduhhb9c4b9vnpkp39ntqh29463a.apps.googleusercontent.com",
  //       scope: "email"
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // }, [CurrentUser]);

  return (
    <>
      <div className='Container_Navbar'>
        <div className="Burger_logo_Navbar">
          <div className="burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={'/'} className='logo_div_Navbar'>
            <img src={logo} alt="" />
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        <IoMdNotificationsOutline size={22} className="not_bell_Navabr" />
        <div className="Auth_cont_Navbar">
          {CurrentUser?.result ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
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
                  <p onClick={() => {
                    setShowLoginOptions(true);
                    setAuthBtn(false)
                  }
                  } className="Auth_Btn">
                    <BiUserCircle size={22} />
                    <b>Sign In</b>
                  </p>
        
            </>
          )}
        </div>
      </div>
      {
        showLoginOptions && (
          <LoginOptions
            setEditCreateChanelBtn={setEditCreateChanelBtn}
            setShowLoginOptions={setShowLoginOptions} // Pass the state updater function to close LoginOptions
            setAuthBtn={setAuthBtn} 
            setOtpLogin={setOtpLogin}
            setShowRegister={setShowRegister}
            User={CurrentUser}
          />
        )}
      {AuthBtn && (
        <Auth
          setAuthBtn={setAuthBtn}
          setEditCreateChanelBtn={setEditCreateChanelBtn}
          User={CurrentUser}
        />
      )}
      {otpLogin && (
          <OtpLogin
          setOtpLogin={setOtpLogin} 
          setShowLoginOptions={setShowLoginOptions}
          handleLoginSuccess={() => {
            setShowLoginOptions(false); // Hide LoginOptions component
          }} 
          />
      )}
      {showRegister && (
        <RegisterForm setShowRegister={setShowRegister} setShowLoginOptions={setShowLoginOptions} />
      )}
    </>
  );
}
export default Navbar;