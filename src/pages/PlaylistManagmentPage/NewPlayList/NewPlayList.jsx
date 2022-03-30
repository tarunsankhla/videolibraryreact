import axios from 'axios';
import React, { useState } from 'react'
import IcRoundCancel from '../../../components/UI/Icons/IcRoundCancel';
import IcRoundCreate from '../../../components/UI/Icons/IcRoundCreate';
import { usePlayList } from '../../../context/PlayListContext';

function NewPlayList({setHandleCreatePlayList}) {
    // const { setHandleCreatePlayList } = props;
    console.log(setHandleCreatePlayList)
    const [playlistName, setPlayListName] = useState("");
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    const [ error, setError ] = useState(false);
    var ongoingReq = true;
    const createPlaylistHandler = async () => { 
        try {
            console.log(playListContextArray.filter(i => i.name === playlistName).length === 0, playlistName === "");
            
            if (ongoingReq) {
                ongoingReq = false;
                var res = await axios.post("/api/user/playlists",
                    { "playlist": { "name": playlistName } },
                    {
                        headers: { authorization: localStorage.getItem("jafnaToken") }
                    });
                console.log(res);
                setPlayListName("");
                
                RenderPlayListData();
                setHandleCreatePlayList((prev) => !prev);
                ongoingReq = true
            }
        }
        catch(error){
          console.log("Product list page error",error);
        }
    }
    
    const RenderPlayListData = () => { 
        (async() => {
            var res = await axios.get("/api/user/playlists",{ headers:{
              authorization:localStorage.getItem("jafnaToken")}});
              console.log(res);
              setPlayListContextArray(res.data.playlists);
        })()
    }
    return (
            <div className='new-playlist-modal lg-txt'>
                <div className='playlist-modal-header'>
                    <h2>Create New Playlist</h2>
                    <span onClick={() => { setHandleCreatePlayList(false) }}><IcRoundCancel /></span>
                </div>
                <input value={playlistName} className='input-playlist' onChange={(e) => { setPlayListName(e.target.value)}} placeholder='PlayList Name' />
                <button   button className='btn-create-playlist lg-txt' onClick={() => createPlaylistHandler()}>
                    Add PlayList
                </button>
            </div>
        )
}

export default NewPlayList