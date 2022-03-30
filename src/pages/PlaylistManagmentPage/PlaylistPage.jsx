import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlayListMainCard from '../../components/UI/Modal/PlayListMainCard/PlayListMainCard';
import IcRoundCreate from '../../components/UI/Icons/IcRoundCreate';
import { usePlayList } from '../../context/PlayListContext';
import NewPlayList from './NewPlayList/NewPlayList';
import "./PlaylistPage.css";

function PlaylistPage() {
  const {playListContextArray,setPlayListContextArray} = usePlayList();
  const [handleCreatePlayList, setHandleCreatePlayList] = useState(false);
  const [ playlist, setPlaylist ] = useState([]);
  useEffect(() => { 
      try{
        (async() => {
        var res = await axios.get("/api/user/playlists",{ headers:{
          authorization:localStorage.getItem("jafnaToken")}});
          console.log(res);
          setPlayListContextArray(res.data.playlists);
          setPlaylist(res.data.playlists);
    })()}
    catch(error){
      console.log("Product list page error",error);
    }
  }, [])
  

  
  return (
    <div className='playlist-container'>
      <div>
        <button onClick={() => setHandleCreatePlayList((prev) => !prev)} className='btn btn-initial-create'>
          Create Playlist
          <IcRoundCreate/>
        </button>
      
        {
          handleCreatePlayList && <NewPlayList setHandleCreatePlayList={ setHandleCreatePlayList }/>
        }
      </div>
      <hr/>
      <div>
        {
          playListContextArray.map((item) => (
            <PlayListMainCard key={item._id} props={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default PlaylistPage