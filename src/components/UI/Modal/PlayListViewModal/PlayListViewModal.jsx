import axios from 'axios';
import React from 'react'
import { usePlayList } from '../../../../context/PlayListContext';
import "./PlayListViewModal.css";


function PlayListViewModal({ data, setPlayListModal }) {
    const { playListContextArray, setPlayListContextArray } = usePlayList();
    const { videoDetails } = data;

    /**
     * 
     * @param {string} name 
     * method is to add a video in playlist
     */
    const SelectedPlayListHandler = async (playlistItem) => {
        try {
            var res = await axios.post(`/api/user/playlists/${playlistItem}`,
                { "video": { ...data } },
                {
                    headers: { authorization: localStorage.getItem("jafnaToken") }
                });
            try {
                (async () => {
                    var res = await axios.get("/api/user/playlists", {
                        headers: {
                            authorization: localStorage.getItem("jafnaToken")
                        }
                    });
                    setPlayListContextArray(res.data.playlists);
                })()
            }
            catch (error) {
                console.log("Product list page error", error);
            }
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
        <div className='playlistmodal-contatiner'>
            <div>
                {
                    playListContextArray?.map((item) => (
                        <div className='playlist-list' key={item._id} >
                            <input type="radio" name="playlist" value={item._id}
                                onClick={(e) => SelectedPlayListHandler(e.target.value)} />
                            {item.name}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlayListViewModal