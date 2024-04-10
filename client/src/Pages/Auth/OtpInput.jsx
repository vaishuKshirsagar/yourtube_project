import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import './OtpLogin.css';

const OtpInput = ({length = 6, onOtpSubmit = () => {}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(()=> {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    }, [])

    console.log(inputRefs);

    const handleChange =(index, e)=> {
        const value = e.target.value;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        //submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

        //move to next input if current field is filled
        if(value && index<length-1 && inputRefs.current[index +1]){
            inputRefs.current[index + 1].focus();
        } 
        console.log(newOtp, combinedOtp); 
    };
    const handleClick =(index)=> {
        inputRefs.current[index].setSelectionRange(1, 1);

        //optional
        if(index>0 && !otp[index - 1]){
            inputRefs.current[otp.indexOf("")].focus();
        }
    }

    const handleKeyDown =(index, e)=> {
        if(
            e.key === "Backspace" && 
            !otp[index] && index>0 && inputRefs.current[index -1])
        {
            inputRefs.current[index - 1].focus();
        }
    }

  return( 
  <div className="otpInputContainer">
       {otp.map((value, index) => {
            return (
            <input
            key={index} 
                type="text"
                ref={(input) => (inputRefs.current[index] = input)} 
            value={value}
            onChange={(e)=> handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className= "otpInput"
            />
            );
        })}
        <button onClick={() => onOtpSubmit(otp)}>Verify OTP</button>
    </div>)
}

export default OtpInput;