import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
import "./Search.css"
// import vid1 from '../../Components/Video/vid1.mp4'
// import vid2 from '../../Components/Video/vid2.mp4'
// import vid3 from '../../Components/Video/vid3.mp4'
// import vid4 from '../../Components/Video/vid4.mp4'
// import vid5 from '../../Components/Video/vid5.mp4'
// import vid6 from '../../Components/Video/vid6.mp4'
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function Search() {

    const {searchQuery} = useParams();
  const vids = useSelector(state=>state.videoReducer)
  ?.data?.filter((q)=>q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())).reverse();

  return (
    <div className="container_Pages_App">
      <LeftSidebar/>
      <div className="container2_Pages_App">
        <h2 style={{color:"white"}}>Search Result for {searchQuery}... </h2>
        <ShowVideoGrid vids={vids}/>
      </div>
      </div>
  )
}

export default Search;