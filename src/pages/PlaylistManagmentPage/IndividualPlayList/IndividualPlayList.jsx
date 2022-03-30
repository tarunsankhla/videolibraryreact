import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import PlayListVideoCards from '../../../components/UI/Cards/PlayListVideoCards/PlayListVideoCards';
import "./IndividualPlayList.css";

function IndividualPlayList() {
    const [PlayListVideos, setPlayListVideos] = useState([]);
    const location = useLocation();
    const PlayListId = location.search.slice(1);
    console.log(location,PlayListId);//40dddf5b-2c34-4536-9834-aa408e1e67dd
    useEffect(() => { 
        try{
          (async() => {
          var res = await axios.get(`/api/user/playlists/${PlayListId}`,{ headers:{
            authorization:localStorage.getItem("jafnaToken")}});
              console.log(res);
              setPlayListVideos(res.data.playlist.videos)
            // setPlayListContextArray(res.data.playlists);
            // setPlaylist(res.data.playlists);
      })()}
      catch(error){
        console.log("Product list page error",error);
      }
    }, [])
    
  return (
      <div>
            <div className='playlist-individual-container'>
                {PlayListVideos?.map((item) => (
                    <PlayListVideoCards key={item.id} props={item} setPlayListVideos={setPlayListVideos}/>
                ))}
            </div>
      </div>
      
  )
}

export default IndividualPlayList