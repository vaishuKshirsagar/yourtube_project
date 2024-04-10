import React from 'react'
import './Comments.css';
import {useState, useEffect} from 'react';
import DisplayComments from './DisplayComments';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/comments';
import reverseGeocode from './reverseGeocode';

function Comments({ videoId }) {
  const GOOGLE_MAP_API_KEY = "AIzaSyDMAbLj8cW1B2Ihx6suwJTYGlERn03igik";
  const [commentText, setCommentText]= useState("");
  const [userLocation, setUserLocation] = useState(null); 
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const commentsList = useSelector(s=>s.commentReducer)

  // const commentsList=[
  //   {
  //     _id: "1",
  //     commentBody: "hello",
  //     userCommented: "abc",
  //   },
  //   {
  //     _id: "2",
  //     commentBody: "hii",
  //     userCommented: "xyz",
  //   },
  // ];

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        function (error) {
          console.error("Error getting user's location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation(); // Call getUserLocation when the component mounts
  }, []);

  const dispatch = useDispatch()
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (CurrentUser) {
      if (!commentText) {
        alert("Plz Type your comment ! ");
      } else {
        //Call reverseGeoCode 
        reverseGeocode(userLocation.latitude, userLocation.longitude, GOOGLE_MAP_API_KEY)
        .then((location) => {
          // Dispatch postComment action with location information
          dispatch(
            postComment({
              videoId: videoId,
              userId: CurrentUser?.result._id,
              commentBody: commentText,
              userCommented: CurrentUser?.result.name,
              userLocation: location, // Pass location information
            })
          );
          setCommentText('');
        })
        .catch((error) => {
          console.error('Error getting location:', error);
          // Dispatch postComment action without location information
          dispatch(
            postComment({
              videoId: videoId,
              userId: CurrentUser?.result._id,
              commentBody: commentText,
              userCommented: CurrentUser?.result.name,
            })
          );
          setCommentText('');
        });
    }
    }else{
      alert("Plz login to post your commnet !")
    }
  };
  return (
    <>
        <form action="" className="comments_sub_from_comments"
        onSubmit={handleOnSubmit}
        >
            <input type="text" 
            onChange={(e)=> setCommentText(e.target.value)}
            placeholder='add comment...'
            value={commentText}
            className='comment_ibox'
            />
            <input type="submit" value= "add" className="comment_add_btn_comments"/>
        </form>
        <div className="display_comment_container">
          {commentsList?.data
          ?.filter((q) => videoId === q?.videoId)
          .reverse()
          .map((m)=>{
              return(
                <DisplayComments
                cId={m._id}
                userId={m.userId}
                commentBody={m.commentBody}
                commentOn={m.commentOn}
                userCommented={m.userCommented}
                userLocation={m.userLocation}
                />
              )
            })
          }
        </div>
    </>
  );
}

export default Comments