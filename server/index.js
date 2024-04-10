import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'
import passport from 'passport'
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import User from './models/auth.js';


dotenv.config()

const app=express()

//CORS policy
app.use(cors())
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.use('/uploads', express.static(path.join('uploads')))

//SetUp session
app.use(session({
    secret:"yourtube",
    resave: false,
    saveUnitializeed: true
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());

// passport.use(
//     new OAuth2Strategy({
//         clientID:clientId,
//         clientSecret:clientSecret,
//         callbackURL:"/user/login/google/callback",
//         scope: ["profile", "email"]
//     }, 
//     async(accessToken, refreshToken, profile, done)=> {
//         try {
//             let user = await User.findOne({googleId:profile.id});
//             if(!user){
//                 user = new User({
//                     googleId: profile.id,
//                     name: profile.name, 
//                     email: profile.emails[0].value,
//                     image: profile.photos[0].value
//                 });
//                 await user.save()
//             }
//             return done(null, user)
//         } catch (error) {
//             return done(error, null)
//         }
//     }
//     )
// )

app.get('/',(req, res)=>{
    res.send("Hello")
})

app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentsRoutes)

passport.serializeUser((user, done)=>{
    done(null, user);
})

passport.deserializeUser((user, done)=>{
    done(null, user);
})

//Initial google auth login 
app.get("/user/login/google", passport.authenticate("google", {scope:["profile", "email"]}))
app.get("/user/login/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/login"
}))

const PORT= process.env.PORT
app.listen(PORT, ()=>{ 
    console.log(`Server running on the PORT ${PORT}`);
})

const DB_URL= process.env.CONNECTION_URL
mongoose.connect(DB_URL, {
    useNewUrlParser: true,      // Deprecated in MongoDB driver v4.0.0
    useUnifiedTopology: true // Deprecated in MongoDB driver v4.0.0
    // useFindAndModify: false,   // To disable deprecated findOneAndUpdate() and findOneAndRemove()
    // useCreateIndex: true       // To enable mongoose to use createIndex() instead of ensureIndex()
}).then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{
    console.log(error);
});