import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import "./VideoListingPage.css";

function VideoListingPage() {
  const [videoLib, setVideoLib] = useState([]);
  useEffect(()=>{
    try{
      (async() => {
      var res = await axios.get("/api/videos");
      console.log(res);
      // console.log(res.data.products);
      setVideoLib(res.data.videos);
     
  })()}
  catch(error){
    console.log("Product list page error",error);
  }
},[]);
  return (
    <div>
      <div className='videolist-container'>
        {
          videoLib.map((item) => (
            <VideoCards key={item.id} props={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default VideoListingPage