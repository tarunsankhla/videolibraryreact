import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { HolderImg6 } from '../../../assets/Holders/holder';
import PlayListVideoCards from '../../../components/UI/Cards/PlayListVideoCards/PlayListVideoCards';
import { Toast } from '../../../components/UI/Toast/toast';
import { VAR_ENCODE_TOKEN } from "../../../utils/Route";
import "./IndividualPlayList.css";

function IndividualPlayList() {
  const [PlayListVideos, setPlayListVideos] = useState([]);
  const location = useLocation();
  const PlayListId = location.search.slice(1);
  console.log(location, PlayListId);//40dddf5b-2c34-4536-9834-aa408e1e67dd
  useEffect(() => {
    try {
      (async () => {
        var res = await axios.get(`/api/user/playlists/${PlayListId}`, {
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          }
        });
        setPlayListVideos(res.data.playlist.videos)
      })()
    }
    catch (error) {
      console.log("Product list page error", error);
      Toast("error", "Some Internal Issue!!");
    }
  }, [])

  return (
    <div>
      <div className='playlist-individual-container'>
        {PlayListVideos.length === 0 
          ? <div className='nocontent'>
            <div className='page-title md-txt' >The Playlist Contains No Video </div><img src={HolderImg6} className="holders" alt='no video'/></div>
        :  PlayListVideos?.map((item) => (
          <PlayListVideoCards key={item.id} props={item} setPlayListVideos={setPlayListVideos} />
        ))}


      </div>
    </div>

  )
}

export default IndividualPlayList