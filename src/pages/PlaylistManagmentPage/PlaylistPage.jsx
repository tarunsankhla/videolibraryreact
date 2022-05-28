import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlayListMainCard from '../../components/UI/Modal/PlayListMainCard/PlayListMainCard';
import {IcRoundCreate} from '../../components/UI/Icons';
import { usePlayList } from '../../context/PlayListContext';
import NewPlayList from './NewPlayList/NewPlayList';
import { VAR_ENCODE_TOKEN } from "../../utils/Route";
import {
  HolderImg1
} from "../../assets/Holders/holder";
import "./PlaylistPage.css";
import { Toast } from '../../components/UI/Toast/toast';
import { useAuth } from '../../context/AuthContext';

function PlaylistPage() {
  const { playListContextArray, setPlayListContextArray } = usePlayList();
  const [handleCreatePlayList, setHandleCreatePlayList] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const { login, setlogin } = useAuth();

  useEffect(() => {
    try {
      (async () => {
        var res = await axios.get("/api/user/playlists", {
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          }
        });
        setPlayListContextArray(res.data.playlists);
        setPlaylist(res.data.playlists);
      })()
    }
    catch (error) {
      Toast("error", "Some Internal Server Issue!!");
    }
  }, [])

  const NotLoginErrorHandler = () => { 
    if (login) {
      setHandleCreatePlayList((prev) => !prev)
    }
    else {
      Toast("error", "You need to login!!")
    }
  }

  return (
    <div className='playlist-container'>
      <div className="page-title">My Playlist</div>
      <div>
        <button onClick={() => NotLoginErrorHandler()} className='btn btn-initial-create'>
          Create Playlist
          <IcRoundCreate />
        </button>

        
        
      </div>
      <hr />
      <div className='playlist-container-list'>
        {
          playListContextArray.length === 0 ? 
          <div className='nocontent'>
              <div className='page-title md-txt' >
                Currently No PlayList exist
              </div>
              <img src={HolderImg1} className="holders" loading="lazy" />
            </div>
          :
          playListContextArray.map((item) => (
            <PlayListMainCard key={item._id} props={item} />
          ))
        }
      </div>
      {
            handleCreatePlayList && login
            && <NewPlayList setHandleCreatePlayList={setHandleCreatePlayList} /> 
        }
    </div>
  )
}

export default PlaylistPage