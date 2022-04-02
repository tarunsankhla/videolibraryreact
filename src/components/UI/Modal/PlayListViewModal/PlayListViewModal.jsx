import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import {usePlayList} from '../../../../context/PlayListContext';
import { ROUTE_PATH_PlayListPage } from '../../../../utils/Route';
import "./PlayListViewModal.css";


function PlayListViewModal({data, setPlayListModal}) {
    const {playListContextArray, setPlayListContextArray} = usePlayList();
    const {videoDetails} = data;

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
                    authorization: localStorage.getItem("FleetsToken")
                }
            });
            console.log(res);
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
            }
        }
        setPlayListModal((prev) => !prev);
    }
    return (
    //<div className='playlistmodal-contatiner'>
    //     <div> {
    //         playListContextArray ?. map((item) => (<div className='playlist-list'
    //             key={
    //                 item._id
    //         }>
    //             <input type="radio" name="playlist"
    //                 value={
    //                     item._id
    //                 }
    //                 onClick={
    //                     (e) => SelectedPlayListHandler(e.target.value)
    //                 }/> {
    //             item.name
    //         }</div>))
    //     } </div>
        <div class="dialog playlistmodal-contatiner">
            <h3 class="dailog-header">My PlayList</h3>
            <div class="dailog-body confirmation-body">
                <ul>
                    {/* <li>
                        <input type="radio" id="html" name="fav_language" value="HTML">
                            <span class="dialog-body-item">item 1</span>
                        </li> */}

                    {playListContextArray.length === 0
                        
                        ? <><li className="dialog-body-item">No Playlist exist</li>
                            <li className="dialog-body-item"><Link to={ROUTE_PATH_PlayListPage} >Create Playlist +</Link></li></>
                     : playListContextArray?.map((item) => (
                        <li key={item._id}>
                            <input type="radio" name="playlist"  value={ item._id }
                                onClick={(e) => SelectedPlayListHandler(e.target.value) }/>
                            <span className="dialog-body-item"> {item.name}</span>
                        </li>))
                    }
                </ul>
                </div>
            </div>
        // </div>
        )
    }
                                    
export default PlayListViewModal;
