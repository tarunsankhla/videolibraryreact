import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { useWatchlater } from '../../../../context/WatchLaterContext';
import ViewCount from '../../../../utils/ViewCount'
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";
import "./WatchLaterVideo.css";


function WatchLaterVideoCards({ props }) {
    const { videoid, snippet, statistics } = props;
    const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } = useWatchlater();
    const RemoveVideoFromWatchLaterHandler = async () => {
        try {
            var res = await axios.delete(`/api/user/watchlater/${videoid}`, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            setWatchlaterProviderContextArray(res.data.watchlater);
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(props, videoid, snippet, statistics)
    return (
        <div>
            <div className="card cart-card transparent">
                <div className='watchlater-content'>
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
                </div>
                <span className="badge watchlater-delete" onClick={() => { RemoveVideoFromWatchLaterHandler(props) }}>
                    <IcTwotoneDelete />
                </span>
            </div>
        </div>
    )
}

export default WatchLaterVideoCards