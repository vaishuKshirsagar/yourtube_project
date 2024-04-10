import React from 'react'
import './Comments.css'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comments';
import moment from 'moment';
import reverseGeocode from './reverseGeocode';


function DisplayComments({cId, commentBody, userId,commentOn, userCommented, userLocation}) {
  const GOOGLE_MAP_API_KEY = "AIzaSyDMAbLj8cW1B2Ihx6suwJTYGlERn03igik";
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setcmtBdy]= useState("");
  const [cmtId, setcmtId]= useState("");
  const [locationInfo, setLocationInfo] = useState(null);

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  
  useEffect(() => {
    if (userLocation) {
      reverseGeocode(userLocation.latitude, userLocation.longitude, GOOGLE_MAP_API_KEY)
        .then((location) => {
          setLocationInfo(location);
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }
  }, [userLocation]);
  
  const handleEdit=(ctId, ctBdy)=>{
      setEdit(true);
      setcmtId(ctId)
      setcmtBdy(ctBdy);
  }

  const dispatch = useDispatch();
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(!cmtBdy){
      alert("Type your comment")
    }else{
      dispatch(editComment({
        id: cmtId,
        commentBody: cmtBdy
      }))
      setcmtBdy("")
    }
    setEdit(false);
  };

  const handleDel = (id)=>{
    dispatch(deleteComment(id))
  }

  return (
    <>
    {Edit ? (
      <>
      <form 
        className="comments_sub_from_comments"
        onSubmit={handleOnSubmit}
        >
            <input
            type="text" 

            onChange={(e) => setcmtBdy(e.target.value)}
            placeholder='Edit comment...'
            value={cmtBdy}
            className='comment_ibox'
            />
            <input type="submit" 
            value= "Change" 
            className="comment_add_btn_comments"/>
        </form>
      </>
      ):(
        <p className="comment_body">{commentBody}</p>
      )}
      <p className="usercommented"> - {userCommented} commented {moment(commentOn).fromNow()}</p>
      {locationInfo && ( // Check if locationInfo is not null before accessing its properties
        <p className="user_location">
          Location: {locationInfo.city}, {locationInfo.state}
        </p>
      )}
    {
        CurrentUser?.result._id === userId && (
      <p className="EditDel_DisplayComment">
      <i onClick={()=> handleEdit(cId, commentBody)}>Edit</i><br/>
      <i onClick={()=> handleDel(cId)}>Delete</i>
    </p>
      )
    }
    </>
  );
}

export default DisplayComments;