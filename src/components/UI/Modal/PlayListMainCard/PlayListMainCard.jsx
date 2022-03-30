import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { usePlayList } from '../../../../context/PlayListContext';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';

import "./PlayListMainCard.css";

function PlayListMainCard({ props }) {
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    const navigate = useNavigate();
    console.log(props);
    var playListRedirectURl = `/getPlaylistById?${props._id}`;

    /**delete a playlist  */
    const deletePlayListHandler = async(id) => { 
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/playlists/${id}`,{ headers:{
                authorization:localStorage.getItem("jafnaToken")}});
            console.log(res);
            setPlaylistDateAfterDelete();
        }
        catch (err) { 
            console.log(err)
        }
    }

    /**
     * get playlist and render the list again.
    */
    const setPlaylistDateAfterDelete = () => { 
        (async() => {
            var res = await axios.get("/api/user/playlists",{ headers:{
              authorization:localStorage.getItem("jafnaToken")}});
              console.log(res);
              setPlayListContextArray(res.data.playlists);
        })()
    }

    const OnCLickCardHandler = () => {
        console.log(playListRedirectURl);
        navigate(playListRedirectURl);
    }
    return (
        //to={playListRedirectURl}
        <div className='playlist-main-cards'>
            <div onClick={() =>OnCLickCardHandler()} className="playlist-main-card-body" >
                <h3>{props.name}</h3>
                <span>{props.videos.length} videos</span>
            </div>
            <div className='playlist-whole-delete' onClick={() => deletePlayListHandler(props._id)}>
                <IcTwotoneDelete />
            </div>
        </div>
  )
}

export default PlayListMainCard