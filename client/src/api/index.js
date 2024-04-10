import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
const API = axios.create({baseURL: `http://localhost:5500`})
API.interceptors.request.use(req=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const register = (userData) => API.post('/user/register', userData);
export const login=(authData)=>API.post('/user/login/google', authData);
export const sendOtp = (phoneNumber) => API.post('/user/login/phone/sendOtp', { phoneNumber });
export const verifyOtp = (phoneNumber, otp) => API.post('/user/login/phone/verifyOtp', { phoneNumber, otp });

// export const generateClientId = () => API.get('/user/generate-client-id');

export const updateChanelData=(id, updateData)=> API.patch(`/user/update/${id}`, updateData)

export const fetchAllChanel=()=> API.get('/user/getAllChanels');

export const uploadVideo=(fileData, fileOptions)=>API.post("/video/uploadVideo", fileData, fileOptions);
export const getVideos=()=> API.get('video/getvideos');

export const likeVideo=(id, Like)=> API.patch(`/video/like/${id}`,{Like});
export const viewsVideo=(id)=> API.patch(`/video/view/${id}`);

export const addToLikedVideo=(likedVideoData)=>API.post('/video/likeVideo', likedVideoData)
export const getAlllikedVideo=()=> API.get('/video/getAlllikeVideo'); 
export const deletelikedVideo=(videoId, Viewer)=> API.delete(`/video/deletelikedVideo/${videoId}/${Viewer}`); 

export const addToWatchLater=(watchLaterData)=>API.post('/video/watchLater', watchLaterData)
export const getAllwatchLater=()=> API.get('/video/getAllwatchLater'); 
export const deleteWatchLater =(videoId, Viewer) => API.delete(`/video/deleteWatchlater/${videoId}/${Viewer}`);

export const addToHistory=(watchLaterData)=>API.post('/video/History', watchLaterData)
export const getAllHistory=()=> API.get('/video/getAllHistory'); 
export const deleteHistory =(userId) => API.delete(`/video/deleteHistory/${userId}`);

export const postComment = (CommentData)=> API.post('/comment/post', CommentData)
export const deleteComment = (id)=> API.delete(`/comment/delete/${id}`)
export const editComment = (id, commentBody)=> API.patch(`/comment/edit/${id}`, {commentBody})
export const getAllComment = ()=> API.get('/comment/get')