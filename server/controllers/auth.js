import jwt from "jsonwebtoken"
import users from '../models/auth.js'
import { v4 as uuidv4 } from 'uuid';

// Function to generate a dynamic client ID
export const generateClientId = (req, res) => {
    // Generate a new client ID dynamically (replace this with your logic)
    const clientId = createClientId = () => {
        // Generate a UUID (v4) as the client ID
        const clientId = uuidv4();
        return clientId;
    }; // Implement this function as per your requirements
    
    // Send the generated client ID as a response
    res.status(200).json({ clientId });
};


export const login = async(req, res)=>{
    const { email, PHONE_NUMBER, otp } = req.body;
    console.log(email);
    console.log(PHONE_NUMBER);
    try{
        const existingUser = await users.findOne({email, PHONE_NUMBER});
        if(!existingUser){
            try {
                const newUser = await users.create({email, PHONE_NUMBER, otp});
                const token = jwt.sign({
                    email: newUser.email, id:newUser._id
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                res.status(200).json({result:newUser, token})
            } catch (error) {
                res.status(500).json({mess:"Something went wrong..."})
            }
        } else{
            console.log('Found existing user:', existingUser);
            const token = jwt.sign({
                email: existingUser.email, id:existingUser._id
            },process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            res.status(200).json({result:existingUser, token})
        }
    } catch (error){
        res.status(500).json({mess:"Something went wrong..."})
    }
}