import axios from 'axios';
import React, { useEffect } from 'react';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import { useWatchlater } from '../../context/WatchLaterContext';
import "./WatchLater.css";

function WatchLater() {
  const { WatchlaterProviderContextArray,setWatchlaterProviderContextArray } = useWatchlater();
  useEffect(()=>{
    try{
      (async() => {
        var res = await axios.get("/api/user/watchlater",{ headers:{
          authorization:localStorage.getItem("jafnaToken")}});
          console.log(res);
          // console.log(res.data.products);
          setWatchlaterProviderContextArray(res.data.watchlater);
        })()
      }
      catch(error){
        console.log("Product list page error",error);
      }
    },[]);
  return (
    <>
      {WatchlaterProviderContextArray?.map((item) => (
        <VideoCards key={item.id} props={item}/>
      ))}
    </>
  )
}
export default WatchLater