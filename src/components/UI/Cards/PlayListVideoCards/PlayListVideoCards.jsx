import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ViewCount from '../../../../utils/ViewCount';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import "./PlayListVideoCards.css";

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
                    authorization: localStorage.getItem("FleetsToken")
                }
            });
            setPlayListVideos(res.data.playlist.videos);
            (async () => {
                var res = await axios.get(`/api/user/playlists/${playlistId}`, {
                    headers: {
                        authorization: localStorage.getItem("FleetsToken")
                    }
                });
                console.log(res);
            })()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>

            <div className="card cart-card">
                <Link to="/video/watch" state={props}>
                    <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                    <div className="card-content">
                        <div className="card-body">
                            <span className="text-grey elipsis">{snippet.title}</span>
                            {snippet.channelTitle}

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