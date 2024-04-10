import {combineReducers} from "redux"
import authReducer from "./auth";
import otpReducer from './otp';
import currentUserReducer from "./currentUser";
import chanelReducers from "./chanel";
import videoReducer from "./Video";
import likedVideoReducer from "./likedVideo";
import watchLaterReducer from "./watchLater";
import HistoryReducer from "./history";
import commentReducer from "./comments";
import registrationReducer from "./registration";

export default combineReducers({
    authReducer,
    otp: otpReducer,
    registrationReducer,
    currentUserReducer,
    chanelReducers,
    videoReducer,
    likedVideoReducer, 
    watchLaterReducer,
    HistoryReducer,
    commentReducer
});