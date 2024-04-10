const initialState = {
    registering: false, // Add a new state to track registration status
    error: null,
  };
  
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_REQUEST':
        return { ...state, registering: true, error: null };
      case 'REGISTER_SUCCESS':
        return { ...state, registering: false, error: null };
      case 'REGISTER_FAILURE':
        return { ...state, registering: false, error: action.payload };
      default:
        return state;
    }
  };
  
export default registrationReducer;
  