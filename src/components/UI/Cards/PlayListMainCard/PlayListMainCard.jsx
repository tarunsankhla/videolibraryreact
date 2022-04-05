import axios from 'axios';
import React from 'react'
import { usePlayList } from '../../../../context/PlayListContext';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import "./PlayListMainCard.css";

function PlayListMainCard({ props }) {
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    console.log(props);
    const deletePlayListHandler = async(id) => { 
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/playlists/${id}`,{ headers:{
                authorization:localStorage.getItem(VAR_ENCODE_TOKEN)}});
            console.log(res);
            setPlaylistDateAfterDelete();
        }
        catch (err) { 
            console.log(err)
        }
    }
    const setPlaylistDateAfterDelete = () => { 
        (async() => {
            var res = await axios.get("/api/user/playlists",{ headers:{
              authorization:localStorage.getItem(VAR_ENCODE_TOKEN)}});
              console.log(res);
              setPlayListContextArray(res.data.playlists);
        })()
    }
    return (
        <div className='playlist-main-cards'>
            <div>
                <h3>{props.name}</h3>
                <span>{props.videos.length} videos</span>
            </div>
            <div onClick={() => deletePlayListHandler(props._id)}>
                <IcTwotoneDelete />
            </div>
      </div>
  )
}

export default PlayListMainCard