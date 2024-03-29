import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { usePlayList } from '../../../../context/PlayListContext';
import {IcTwotoneDelete} from '../../Icons';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import "./PlayListMainCard.css";
import { Toast } from '../../Toast/toast';

function PlayListMainCard({ props }) {
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    const navigate = useNavigate();
    var playListRedirectURl = `/getPlaylistById?${props._id}`;

    /**delete a playlist  */
    const deletePlayListHandler = async (id) => {
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/playlists/${id}`, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            setPlaylistDateAfterDelete();
            if (res.status === 200) {
                Toast("succes", "PlayList Deleted");
            }
        }
        catch (err) {
            console.log(err)
            Toast("error","Failed to remove Playlist!!")
        }
    }

    /**
     * get playlist and render the list again.
    */
    const setPlaylistDateAfterDelete = () => {
        (async () => {
            var res = await axios.get("/api/user/playlists", {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            setPlayListContextArray(res.data.playlists);
        })()
    }

    const OnCLickCardHandler = () => {
        console.log(playListRedirectURl);
        navigate(playListRedirectURl);
    }
    return (
        <div className='playlist-main-cards'>
            <div onClick={() => OnCLickCardHandler()} className="playlist-main-card-body" >
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