import React from 'react'
// import vid1 from '../../Components/Video/vid1.mp4'
import vid2 from '../../Components/Video/vid2.mp4'
// import vid3 from '../../Components/Video/vid3.mp4'
// import vid4 from '../../Components/Video/vid4.mp4'
// import vid5 from '../../Components/Video/vid5.mp4'
// import vid6 from '../../Components/Video/vid6.mp4'
import './VideoPage.css'
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../Components/Comments/Comments'
import {Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';
import { addToHistory } from '../../actions/History';
import { viewVideo } from '../../actions/video';

function VideoPage() {
  const {vid}= useParams();

  // const chanels= useSelector(state=>state?.chanelReducers)
  // const currentChanel = chanels.filter(c=> c._id === vid)[0];

  const vids = useSelector((state)=>state.videoReducer);
  const vv = vids?.data.filter( (q) => q._id === vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  
  const handleHistory=()=>{
    dispatch(
      addToHistory({
          videoId: vid,
          Viewer: CurrentUser?.result._id,
        })
    );
  };

  const handleViews=()=>{
    dispatch(viewVideo({
      id: vid
    }))
  }

  useEffect(()=>{
    if(CurrentUser){
      handleHistory();
    }
    handleViews();
  }, []);


  return (
    <>
    <div className="container_videoPage">
        <div className="container2_videoPage">
            <div className="video_display_screen_videoPage">
                <video 
                src={`http://localhost:5500/${vv.filePath}`}
                className={"video_ShowVideo_videoPage"}
                controls
                // autoplay
                >
                </video>
                <div className="video_details_videoPage">
                  <div className="video_btn_titl-VideoPage_cont">
                    <p className="video_title_VideoPage">
                     {vv?.videoTitle}
                    </p>
                    <div className="view_data_btns_VideoPage">
                        <div className="views_videoPage">
                        {vv?.Views} views<div className="dot"></div> Uploaded {moment(vv?.createdAt).fromNow()}
                        </div>
                    </div>
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid}/>
                  <Link to={`/chanel/${vv?.videoChanel}`} className="chanel_details_videoPage">
                    <b className="chanel_logo_videoPage">
                      <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
                    </b>
                    <p className="chanel_name_videoPage">{vv?.Uploader}</p>
                  </Link>
                  <div className="comment_VideoPage">
                    <h2>
                      <u>Comments</u>
                    </h2>
                    <Comments videoId={vv._id}/>
                  </div>
                </div>
            </div>
            <div className="moreVideoBar">
              More Videos
                <video src={vid2}
                className={"video_ShowVideo_videoPage"}
                controls
                // autoplay
                >
                </video>
            </div>
        </div>
        </div>
    </>
  );
}

export default VideoPage