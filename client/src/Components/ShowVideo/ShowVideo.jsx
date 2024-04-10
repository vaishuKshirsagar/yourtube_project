import React from 'react'
import './ShowVideo.css'
import {Link} from 'react-router-dom'
import moment from 'moment';

function ShowVideo({vid}) {
  console.log(vid.filePath);
  return (
    <>
        <Link to= {`/videopage/${vid?._id}`}>
            <video
            src= {`http://localhost:5500/${vid.filePath}`}
                className="video_ShowVideo"
            />
        </Link>
        <div className="video_description">
          <div className="Chanel_logo_App">
            <div className="fstChar_logo_App">
              <>{
                //User?.result?.name
                // ? User?.result.name.charAt(0).toUpperCase()
                // : "Guest"
              vid?.Uploader?.charAt(0).toUpperCase()
              }</>
            </div>
          </div>
          <div className="video_details">
            <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
              <pre className="vid_view_UploadTime">{vid?.Uploader}</pre>
              <pre className="vid_view_UploadTime">
               {vid?.Views} views <div className="dot"></div> Uploaded {moment(vid?.createdAt).fromNow()}
              </pre>
            
          </div>
        </div>
    </>
  )
}

export default ShowVideo