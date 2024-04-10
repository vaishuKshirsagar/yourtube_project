const initialState = {
    otpSent: false, // Add a new state to track OTP sending status
    otpVerified: false, // Add a new state to track OTP verification status
    error: null,
  };
  
  const otpReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_OTP_REQUEST':
        return { ...state, otpSent: false, error: null };
      case 'SEND_OTP_SUCCESS':
        return { ...state, otpSent: true, error: null };
      case 'SEND_OTP_FAILURE':
        return { ...state, otpSent: false, error: action.payload };
      case 'VERIFY_OTP_REQUEST':
        return { ...state, otpVerified: false, error: null };
      case 'VERIFY_OTP_SUCCESS':
        return { ...state, otpVerified: true, error: null };
      case 'VERIFY_OTP_FAILURE':
        return { ...state, otpVerified: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default otpReducer;
  