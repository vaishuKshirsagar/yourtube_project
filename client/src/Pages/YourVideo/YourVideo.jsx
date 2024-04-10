import React from 'react'
// import vid1 from "../../Components/Video/vid1.mp4";
// import vid2 from "../../Components/Video/vid2.mp4";
// import vid3 from "../../Components/Video/vid3.mp4";
// import vid4 from "../../Components/Video/vid4.mp4";
// import vid5 from "../../Components/Video/vid5.mp4";
// import vid6 from "../../Components/Video/vid6.mp4";
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
import './YourVideo.css'
import { useSelector } from 'react-redux';

function YourVideo() {

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const vids = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChanel === CurrentUser?.result?._id).reverse();


  // const vids = [
  //   {
  //     _id: 1,
  //     video_src: vid1,
  //     Chanel: "62bafe6752cea35a6c30685f",
  //     title: "video 1",
  //     Uploder: "abc",
  //     description: "description of  video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid2,
  //     Chanel: "cdd",
  //     title: "video 2",
  //     Uploder: "abc",
  //     description: "description of  video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid3,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //   {
  //     _id: 4,
  //     video_src: vid4,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //   {
  //     _id: 5,
  //     video_src: vid5,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //   {
  //     _id: 6,
  //     video_src: vid6,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  // ];

  return (
    <div className="container_Pages_App">
      <LeftSidebar/>
      <div className="container2_Pages_App">
        <div className="container_yourvideo">
        <h1>Your Videos</h1>
        {
          CurrentUser ? (
          <>
          <ShowVideoGrid vids={vids}/>
          </>) : 
          <>
          <h3> Please login to see your uploaded videos</h3>
          </>
        }
        </div>
      </div>
      </div>
  )
}

export default YourVideo