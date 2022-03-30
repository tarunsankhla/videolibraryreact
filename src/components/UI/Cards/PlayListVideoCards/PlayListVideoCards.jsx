import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router';
import ViewCount from '../../../../utils/ViewCount';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import "./PlayListVideoCards.css";

function PlayListVideoCards({props,setPlayListVideos}) {
    const { videoid, snippet, statistics } = props;
    const location = useLocation();
    const playlistId = location.search.slice(1);
    console.log(props, videoid, snippet, statistics,playlistId)

    const deletePlayListVideoFromIindividualPlayListHandler = async(id) => { 
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/playlists/${playlistId}/${videoid}`,{ headers:{
                authorization:localStorage.getItem("jafnaToken")}});
                console.log(res);
                setPlayListVideos(res.data.playlist.videos);
            // setHistoryContextArray();
            (async() => {
                var res = await axios.get(`/api/user/playlists/${playlistId}`,{ headers:{
                  authorization:localStorage.getItem("jafnaToken")}});
                console.log(res);

                // console.log(res.data.products);
                // setHistoryContextArray(res.data.history);
               
            })()
        }
        catch (err) { 
            console.log(err)
        }
    }
    return (
        <div>
        
            <div className="card cart-card">
                <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                <div className="card-content">
                    <div className="card-body">
                        <span className="text-grey elipsis">{snippet.title}</span>
                        {snippet.channelTitle}
            
                    <h2> <ViewCount viewCount={statistics.viewCount}/></h2>
                    </div>
                </div>
                {/* <div className="card-footer">
                    <div className="card-footer-view">
                        <button onClick={()=>{WatchVideoHandler(props)}}>Add to Cart</button>
                    </div>
                </div> */}
                {/* <span className="material-icons-round badge topright-badge " onClick={()=>{AddVideoToFavourite(props)}}>
                    favorite_border
                </span> */}
                <span className="material-icons-round badge topright-badge " onClick={() => {deletePlayListVideoFromIindividualPlayListHandler(props._id) }}>
                    <IcTwotoneDelete/>
                    {/* <IcRoundAutoModeAddWatchLater />
                    <IcRoundCheckCircleConfirmWatchLater/> */}
                </span>
            </div>
        </div>
    )
}

export default PlayListVideoCards