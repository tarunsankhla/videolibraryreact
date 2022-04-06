import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ViewCount from '../../../../utils/ViewCount';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import "./PlayListVideoCards.css";
import { Toast } from '../../Toast/toast';

function PlayListVideoCards({ props, setPlayListVideos }) {
    const { videoid, snippet, statistics } = props;
    const location = useLocation();
    const playlistId = location.search.slice(1);
    console.log(props, videoid, snippet, statistics, playlistId)

    const deletePlayListVideoFromIindividualPlayListHandler = async (id) => {
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/playlists/${playlistId}/${videoid}`, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            setPlayListVideos(res.data.playlist.videos);
            if (res.status === 200) {
                Toast("success", "Removed from PlayList!!");
            }
            (async () => {
                var res = await axios.get(`/api/user/playlists/${playlistId}`, {
                    headers: {
                        authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                    }
                });
            })()
        }
        catch (err) {
            Toast("error", "Failed to Remove From Playlist!!");
        }
    }
    return (
        <div>

            <div className="card cart-card">
                <Link to="/video/watch" state={props}>
                    <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                    <div className="card-content">
                        <div className="card-body">
                        <span className="text-grey elipsis pd-btm">
                                    {snippet.title
                                }</span>
                               
                                <div className="card-body-channel ">
                                    <img className="channel-img" src={snippet.channelImg} alt="channelimg" />
                                    <span className="elipsis md-txt elipsis-md"> {
                                        snippet.channelTitle
                                    }</span>
                                </div>

                            <h2> <ViewCount viewCount={statistics.viewCount} /></h2>
                        </div>
                    </div>
                </Link>
                <span className="material-icons-round badge topright-badge " onClick={() => { deletePlayListVideoFromIindividualPlayListHandler(props._id) }}>
                    <IcTwotoneDelete />
                    {/* <IcRoundAutoModeAddWatchLater />
                    <IcRoundCheckCircleConfirmWatchLater/> */}
                </span>
            </div>
        </div>
    )
}

export default PlayListVideoCards