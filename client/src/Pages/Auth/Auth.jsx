import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser';
import {Link} from "react-router-dom";
import "./Auth.css";

function Auth({User, setAuthBtn, setEditCreateChanelBtn, clientId}) {

    const dispatch = useDispatch();
    const onLogoutSuccess=()=>{
    dispatch(setCurrentUser(null));
    alert("Log Out Successful");
  }

  return (
    <div className = 'Auth_container' onClick={()=> setAuthBtn(false)}>
        <div className = 'Auth_container2'>
        <p className="User_Details">
            <div className="Chanel_logo_App">
            <p className="fstChar_logo_App">
                {
                    User?.result?.name
                    ? User?.result.name.charAt(0).toUpperCase()
                    : "Guest"
                   }
            </p>
            </div>
            <div className='email_Auth'>{User?.result.email}</div>
        </p>
        <div className="btns_Auth">
            {
                User?.result.name ? <>
                {
                    <Link to={`/chanel/${User?.result._id}`} className="btn_Auth">
                        Your Chanel
                    </Link>
                }              
                </> : <>
                <input type="submit" 
                className="btn_Auth" 
                value="Create Your Channel" 
                onClick={()=>setEditCreateChanelBtn(true)}
                />
                </>
            }
        </div>
        <div>
            <GoogleLogout
            clientId = {clientId}
            onLogoutSuccess = {onLogoutSuccess}
            render={(renderProps)=>(
                <div onClick={renderProps.onClick} className="btn_Auth">
                    <BiLogOut/>
                    Log Out
                </div>
            )} 
            />
        </div>
    </div>
    </div>
)}

export default Auth

