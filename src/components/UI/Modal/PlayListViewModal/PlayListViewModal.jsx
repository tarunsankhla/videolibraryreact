import axios from 'axios';
import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';
import {usePlayList} from '../../../../context/PlayListContext';
import { ROUTE_PATH_PlayListPage } from '../../../../utils/Route';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import { Toast } from '../../Toast/toast';
import NewPlayList from '../../../../pages/PlaylistManagmentPage/NewPlayList/NewPlayList';
import "./PlayListViewModal.css";
import { IcRoundCancel } from '../../Icons';


function PlayListViewModal({data, setPlayListModal}) {
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    const [playlist, setPlaylist] = useState([]);
    const { videoDetails } = data;
    const [handleCreatePlayList, setHandleCreatePlayList] = useState(false);
 

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

    
    /**
     * 
     * @param {string} name 
     * method is use to add a video in playlist
     */
    const SelectedPlayListHandler = async (playlistItem,Playlist) => {
        try {
            if (Playlist.videos.some((i) => i._id === data._id)) {
                try {
                    var res = await axios.delete(`/api/user/playlists/${Playlist._id}/${data._id}`, {
                        headers: {
                            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                        }
                    });
                    if (res.status === 200) {
                        Toast("success", "Removed from PlayList!!");
                    }

                }
                catch (err) {
                    Toast("error", "Failed to Remove From Playlist!!");
                }

            }
            else {
                var res = await axios.post(`/api/user/playlists/${playlistItem}`, {
                    "video": {
                        ...data
                    }
                }, {
                    headers: {
                        authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                    }
                });
                const {data: {
                    playlist
                }, status} = res;
            }
            if (res.status === 201) {
                Toast("success", "Added to Playlist!!");
            }
            try {
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
            catch (error) {
                console.log("Product list page error", error);
            }
        } catch (err) {
            var msg = err.message;
            if (Number(msg.slice(msg.length - 3, msg.length)) === 409) {
                console.log("already added in playlist");
                Toast("error", "Already Exist in Playlist!!");
            }
        }
        setPlayListModal((prev) => !prev);
    }

    return (
        <>
        <div className='modal-body-main-container' onClick={(e) =>
            {
                console.log(1)
                if (e.target.classList.contains("modal-body-main-container")) {
                    console.log(2)
                    setPlayListModal(false)
                }
            }}>
            <div className="playlistmodal-contatiner">
                <div className="dailog-header"><span style={{fontWeight:700}}>My PlayList</span>
                    <span className="dailog-header" onClick={() => { setPlayListModal((prev) => !prev) }}><IcRoundCancel /></span>
                </div>
                <div className="dailog-body confirmation-body">
                    <ul>
                        {playListContextArray.length === 0
                            ? <><li className="dialog-body-item">No Playlist exist</li>
                            </>
                            : playListContextArray?.map((item) => (
                                <li key={item._id}>
                                    <input type="checkbox" name="playlist" value={item._id}
                                        //  checked={item.some((playlistvideo) => playlistvideo.id === data._id)}
                                        checked={item.videos.some((i)=> i._id === data._id)}
                                        onClick={(e) => SelectedPlayListHandler(e.target.value,item) }/>
                                    <span className="dialog-body-item"> {item.name}</span>
                                </li>))
                        }
                    </ul>
                </div>
                <div className="dailog-footer">
                    <button  onClick={() => setHandleCreatePlayList((prev) => !prev)}>Create Playlist +</button>
                    {/* <div>
                       
                    </div> */}
                </div>
            </div>
            </div>
            {
                handleCreatePlayList && <NewPlayList setHandleCreatePlayList={setHandleCreatePlayList} />
            }
        </>
        )
    }
                                    
export default PlayListViewModal;
