import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OtpInput from './OtpInput';
import { sendOtp, verifyOtp } from '../../actions/auth';
import './OtpLogin.css';

const OtpLogin = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    // const [otpLoginSuccess, setOtpLoginSuccess] = useState(false);
    // const [error, setError] = useState('');

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleCountryCode = (event) => {
        setCountryCode(event.target.value);
    };

    const handlePhoneSubmit = (event) => {
        event.preventDefault();

        // Phone number validation
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert('Invalid Phone Number');
            return;
        }

        if (countryCode.length  >=3 || regex.test(countryCode)) {
          alert('Invalid Country Code');
          return;
      }  

        // Construct full phone number with country code
        const fullPhoneNumber = `+${countryCode}${phoneNumber}`;
       
        // Call BE API
        dispatch(sendOtp(fullPhoneNumber));

        // Show OTP input field
        setShowOtpInput(true);
        // setLoginOptions(false);
    };

    const onOtpSubmit = async (otp) => {
        const fullPhoneNumber = `+${countryCode}${phoneNumber}`;
        try{
            await dispatch(verifyOtp(fullPhoneNumber, otp))
            
            // setOtpLoginSuccess(true);
            // setOtpLogin(false);
            // setLoginOptions(false);
            // handleOtpVerificationSuccess();
        } catch(error){
           // If OTP verification fails, show alert
           if (error.response && error.response.status === 500) {
               return; // Do nothing, let the login proceed
           }
           console.error('Error during OTP verification or login:', error);
        }
        // setOtpLogin(false);
        // setShowLoginOptions(false);
        // handleLoginSuccess();
        // handleOtpVerificationSuccess();
    };

    const onCancel = () => {
      setShowOtpInput(false);
    };

    // if(otpLoginSuccess){
    //     setShowOtpInput(false);
    //     return <div>
    //         <h3>Login Successful</h3>
    //     </div>
    // }

    return (
        <div className="OtpLogin">
            <h2>Login with Phone</h2>
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <div>
                        <input
                            type="text"
                            value={countryCode}
                            onChange={handleCountryCode}
                            placeholder="Country Code"
                            maxLength="3"
                        />
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            placeholder="Phone Number"
                        />
                    </div>
                    <button type="submit" onClick={handlePhoneSubmit}>Send OTP</button>
                </form>
            ) : (
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpInput length={6} onOtpSubmit={onOtpSubmit} onCancel={onCancel}/>
                </div>
            )}
        </div>
    );
};

export default OtpLogin;