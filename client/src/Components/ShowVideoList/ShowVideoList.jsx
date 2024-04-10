import React from 'react'
import {useSelector} from 'react-redux'
// import vid1 from '../../Components/Video/vid1.mp4'
import ShowVideo from '../ShowVideo/ShowVideo'

function ShowVideoList({videoId}) {
  const vids = useSelector(s=>s.videoReducer)
  console.log(vids.data);
    // const vids = [
    //     {
    //       _id: 1,
    //       video_src: vid1,
    //       Chanel: "62bafe6752cea35a6c30685f",
    //       title: "video 1",
    //       Uploder: "abc",
    //       description: "description of  video 1",
    //     },
    //     {
    //       _id: 2,
    //       video_src: vid2,
    //       Chanel: "cdd",
    //       title: "video 2",
    //       Uploder: "abc",
    //       description: "description of  video 2",
    //     },
    //     {
    //       _id: 3,
    //       video_src: vid3,
    //       Chanel: "add",
    //       title: "video 3",
    //       Uploder: "abc",
    //       description: "description of  video 3",
    //     },
    //     {
    //       _id: 4,
    //       video_src: vid4,
    //       Chanel: "add",
    //       title: "video 3",
    //       Uploder: "abc",
    //       description: "description of  video 3",
    //     },
    //     {
    //       _id: 5,
    //       video_src: vid5,
    //       Chanel: "add",
    //       title: "video 3",
    //       Uploder: "abc",
    //       description: "description of  video 3",
    //     },
    //     {
    //       _id: 6,
    //       video_src: vid6,
    //       Chanel: "add",
    //       title: "video 3",
    //       Uploder: "abc",
    //       description: "description of  video 3",
    //     },
    //   ];
  return (
    <div className='Container_ShowVideoGrid'>
    {
      vids?.data?.filter(q=>q._id===videoId).map(vi=>
        {
          return (
            <div key={vi._id} className="video_box_app">
              <ShowVideo vid={vi}/>
            </div>
          )
        })
    }  
  </div>
  )
}

export default ShowVideoList
