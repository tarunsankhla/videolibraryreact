import axios from 'axios';
import React, {useState} from 'react'
import {IcRoundCancel} from '../../../components/UI/Icons';
import {Toast} from '../../../components/UI/Toast/toast';
import { useAuth } from '../../../context/AuthContext';
import {usePlayList} from '../../../context/PlayListContext';
import {VAR_ENCODE_TOKEN} from "../../../utils/Route";
function NewPlayList({setHandleCreatePlayList}) { // const { setHandleCreatePlayList } = props;
    console.log(setHandleCreatePlayList)
    const [playlistName, setPlayListName] = useState("");
    const {playListContextArray, setPlayListContextArray} = usePlayList();
    const [error, setError] = useState(false);
    const { login, setlogin } = useAuth();
    var ongoingReq = true;
    const createPlaylistHandler = async () => {
        try {
            if (login) {
                console.log(playListContextArray.filter(i => i.name === playlistName).length === 0, playlistName === "");

                if (playlistName.length) {
                
                    ongoingReq = false;
                    var res = await axios.post("/api/user/playlists", {
                        "playlist": {
                            "name": playlistName
                        }
                    }, {
                        headers: {
                            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                        }
                    });
                    if (res.status === 201) {
                        Toast("success", "Adedd New Playlist!!");
                        setPlayListName("");
                        RenderPlayListData();
                        setHandleCreatePlayList((prev) => !prev);
                        ongoingReq = true
                    }
                }
                else {
                    Toast("error","Playlist name can't be empty")
                }
            } else {
                Toast("error", "you need to login!!");
            }
        } catch (error) {
            Toast("error", "Failed to Added a Playlist!!");
        }
    }

    const RenderPlayListData = () => {
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
    return (
        <div className=' new-playlist-modal lg-txt dialog'>
            <div className='playlist-modal-header dailog-header'>
                <h2>Create New Playlist</h2>
                <span onClick={
                    () => {
                        setHandleCreatePlayList(false)
                    }
                }><IcRoundCancel/></span>
            </div>
            <div className='dailog-body confirmation-body'>
                <input value={playlistName}
                    className='input-playlist'
                    onChange={
                        (e) => {
                            setPlayListName(e.target.value)
                        }
                    }
                    placeholder='PlayList Name'/>
            </div>
        <div class="dailog-footer">
            <button button className='btn-create-playlist lg-txt'
                onClick={
                    () => createPlaylistHandler()
            }>
                Add PlayList
            </button>
        </div>
    </div>
    )
}

export default NewPlayList
