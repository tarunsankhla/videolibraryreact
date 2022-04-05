import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import {usePlayList} from '../../../../context/PlayListContext';
import { ROUTE_PATH_PlayListPage } from '../../../../utils/Route';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import { Toast } from '../../Toast/toast';
import "./PlayListViewModal.css";


function PlayListViewModal({data, setPlayListModal}) {
    const {playListContextArray, setPlayListContextArray} = usePlayList();
    const {videoDetails} = data;
    console.log("playlit modal", data);
    /**
     * 
     * @param {string} name 
     * method is use to add a video in playlist
     */
    const SelectedPlayListHandler = async (playlistItem) => {
        try {
            var res = await axios.post(`/api/user/playlists/${playlistItem}`, {
                "video": {
                    ...data
                }
            }, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            if (res.status === 201) {
                Toast("success", "Added to Playlist!!");
            }
            const {data: {
                    playlist
                }, status} = res;
            console.log(playlist, status);

            // take the response filter the playlist context and append the new video in that playlist
            // setPlayListContextArray((prev) => prev.array.forEach(element => {
            //     element._id === playlistItem ? playlist.video.push[res.data.playlist]
            // });
        } catch (err) {
            console.log(err.status, err.message);
            var msg = err.message;
            if (Number(msg.slice(msg.length - 3, msg.length)) === 409) {
                console.log("already added in playlist");
                Toast("error", "Already Exist in Playlist!!");
            }
        }
        setPlayListModal((prev) => !prev);
    }
    return (
        <div className="dialog playlistmodal-contatiner">
            <h3 className="dailog-header">My PlayList</h3>
            <div className="dailog-body confirmation-body">
                <ul>

                    {playListContextArray.length === 0
                        
                        ? <><li className="dialog-body-item">No Playlist exist</li>
                            <li className="dialog-body-item"><Link to={ROUTE_PATH_PlayListPage} >Create Playlist +</Link></li></>
                     : playListContextArray?.map((item) => (
                        <li key={item._id}>
                            <input type="radio" name="playlist"  value={ item._id } checked={item.some((playlistvideo)=> playlistvideo.id === data._id)}
                                onClick={(e) => SelectedPlayListHandler(e.target.value) }/>
                            <span className="dialog-body-item"> {item.name}</span>
                        </li>))
                    }
                </ul>
                </div>
            </div>
        )
    }
                                    
export default PlayListViewModal;
