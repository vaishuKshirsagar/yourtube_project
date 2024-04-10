import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import AllRoutes from './Components/AllRoutes';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DrawerSidebar from './Components/LeftSidebar/DrawerSidebar';
import { BiNoEntry } from 'react-icons/bi';
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import CreateEditChannel from './Pages/Chanel/CreateEditChannel';
import { fetchAllChanel } from './actions/chanelUser';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import { getAllVideo } from './actions/video';
import { getAlllikedVideo } from './actions/likedVideo';
import { getAllwatchLater } from './actions/watchLater';
import { getAllHistory } from './actions/History';
// import OtpLogin from './Pages/Auth/OtpLogin';
import LoginOptions from './Pages/Auth/LoginOptions';

function App() {
  const dispatch= useDispatch()

  useEffect(() => {
    dispatch(fetchAllChanel());
    dispatch(getAllVideo());
    dispatch(getAlllikedVideo());
    dispatch(getAllwatchLater());
    dispatch(getAllHistory());
  }, [dispatch])

  const [toggleDrawerSidebar, setToggleDrawerSidebar ] = useState({
    display: "none",
  })
  const toggleDrawer=()=>{
    if(toggleDrawerSidebar.display==="none"){
      setToggleDrawerSidebar({
        display:"flex"  
      }) 
    }else{
        setToggleDrawerSidebar({
          display:"none"
        });
      }
    };

    const [ShowLoginOptions, setShowLoginOptions] = useState(false);


  const [vidUploadPage, setVidUploadPage] = useState(false)

  const[EditCreateChanelBtn, setEditCreateChanelBtn] = useState(false)
  
  return (
    <Router>
      {/* <LoginOptions/> */}
      {ShowLoginOptions &&
        <LoginOptions setShowLoginOptions={setShowLoginOptions}/>
      }
      {vidUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage}/>}
      {
        EditCreateChanelBtn &&
        <CreateEditChannel setEditCreateChanelBtn={setEditCreateChanelBtn}/>
      }
      <Navbar 
      setEditCreateChanelBtn={setEditCreateChanelBtn}
      toggleDrawer={toggleDrawer}
      setShowLoginOptions={setShowLoginOptions}
      />
      
        <DrawerSidebar
        toggleDrawer={toggleDrawer}
        toggleDrawerSidebar={toggleDrawerSidebar}
        />
      
      <AllRoutes setVidUploadPage={setVidUploadPage} setEditCreateChanelBtn={setEditCreateChanelBtn}/>
    </Router>
  );
}

export default App;
