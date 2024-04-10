//user directory
import dotenv from "dotenv";
import express from "express";
import { login, generateClientId } from '../controllers/auth.js';
import { registerController } from '../controllers/registration.js';
import { updateChanelData, getAllChanels } from '../controllers/chanel.js';
import { sendOtpController, verifyOtpController } from '../controllers/otpController.js';
// import {authController} from '../controllers/auth.js'

dotenv.config();
const routes = express.Router();

// Define routes
routes.get('/user/generate-client-id', generateClientId);

// Routes for phone login
routes.post('/login/phone/sendOtp', sendOtpController);
routes.post('/login/phone/verifyOtp', verifyOtpController);

// Routes for Google login
routes.post('/login/google', login);
// Route for user registration
routes.post('/register', registerController);

// Other routes
// routes.post('/login', login);  // This might need to be adjusted based on your requirements
routes.patch('/update/:id', updateChanelData);
routes.get('/getAllChanels', getAllChanels);

export default routes;
