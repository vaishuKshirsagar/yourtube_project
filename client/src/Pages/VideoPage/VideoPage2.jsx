import React from 'react'
import vid2 from '../../Components/Video/vid2.mp4'
import vid3 from '../../Components/Video/vid3.mp4'
import './VideoPage.css'
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';

function VideoPage2() {
  return (
    <>
    <div className="container_videoPage">
        <div className="container2_videoPage">
            <div className="video_display_screen_videoPage">
                <video src={vid2}
                className={"video_ShowVideo_videoPage"}
                controls
                // autoplay
                >
                </video>
                <div className="video_details_videoPage">
                  <div className="video_btn_titl-VideoPage_cont">
                    <p className="video_title_VideoPage">
                      Title
                    </p>
                    <div className="view_data_btns_VideoPage">
                        <div className="views_videoPage">
                        5 views <div className="dot"></div> uploaded 1 year ago
                        </div>
                    </div>
                  </div>
                  <LikeWatchLaterSaveBtns/>
                  <div className="chanel_details_videoPage">
                    <b className="chanel_logo_videoPage">
                      <p>C</p>
                    </b>
                    <p className="chanel_name_videoPage">Chanel name</p>
                  </div>
                  <div className="comment_VideoPage">
                    <h2>
                      <u>Comments</u>
                    </h2>
                  </div>
                </div>
            </div>
            <div className="moreVideoBar">
              More Videos
                <video src={vid3}
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

export default VideoPage2