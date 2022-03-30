import axios from 'axios';
import React from 'react'
import { useWatchlater } from '../../../../context/WatchLaterContext';
import ViewCount from '../../../../utils/ViewCount'
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import "./WatchLaterVideo.css";


function WatchLaterVideoCards({ props }) {
    const { videoid, snippet, statistics } = props;
    const { WatchlaterProviderContextArray,setWatchlaterProviderContextArray } = useWatchlater();
    const RemoveVideoFromWatchLaterHandler = async() => { 
        try {
            // console.log(id)
            var res = await axios.delete(`/api/user/watchlater/${videoid}`,{ headers:{
                authorization:localStorage.getItem("jafnaToken")}});
            console.log(res);
            setWatchlaterProviderContextArray(res.data.watchlater);
                // setPlayListVideos(res.data.playlist.videos);
            // setHistoryContextArray();
        }
        catch (err) { 
            console.log(err)
        }
    }
    console.log(props,videoid,snippet,statistics)
    return (
        <div>
            <div className="card cart-card transparent">
                <div>
                    <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                    <div className="card-content">
                        <div className="card-body">
                            <span className="text-grey elipsis">{snippet.title}</span>
                            {snippet.channelTitle}

                            <h2> <ViewCount viewCount={statistics.viewCount}/></h2>
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer">
                    <div className="card-footer-view">
                        <button onClick={()=>{WatchVideoHandler(props)}}>Add to Cart</button>
                    </div>
                </div> */}
                <span className="badge watchlater-delete" onClick={()=>{RemoveVideoFromWatchLaterHandler(props)}}>
                    <IcTwotoneDelete/>
                </span>
            </div>
        </div>
    )
}

export default WatchLaterVideoCards