import axios from 'axios';
import React, { useEffect } from 'react';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import WatchLaterVideoCards from '../../components/UI/Cards/WatchLaterVideoCards/WatchLaterVideoCards';
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
    <div className='watchlater-list-container'>
      {WatchlaterProviderContextArray?.map((item) => (
        <WatchLaterVideoCards key={item.id} props={item}/>
      ))}
    </div>
  )
}
export default WatchLater