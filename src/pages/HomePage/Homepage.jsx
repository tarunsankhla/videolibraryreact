import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousal from '../../components/Carousal/Carousal';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import "./Homepage.css";


function Homepage() {
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
      <Carousal />
      <div className='videolist-container'>
        {
          videoLib.slice(0,9).map((item) => (
            <VideoCards key={item.id} props={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Homepage