import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from '../../../../context/HistoryContext';
import { useLikes } from '../../../../context/LikesContext';
import ViewCount from '../../../../utils/ViewCount';
import IcOutlineWatchLater from '../../Icons/IcOutlineWatchLater';
import IcRoundCheckCircleConfirmWatchLater from '../../Icons/IcRoundCheckCircle';
import './VideoCards.css';

function VideoCards({ props }) {
    const { historyContextArray, setHistoryContextArray } = useHistory();
    const { videoid, snippet, statistics } = props;
    console.log(props,videoid,snippet,statistics)
    const WatchVideoHandler = (props) => { 
        console.log(props);
    }
    const AddVideoToFavourite = async(props) => { 
        console.log(props);
        try {
            console.log(props)
            var res = await axios.post("/api/user/watchlater",
                { "video": { ...props } },
                {
                    headers: { authorization: localStorage.getItem("jafnaToken") }
                });
                console.log(res);
          
        } catch (err) {
            console.log(err)
        }
    }
    const AddToHistoryHandler = async (props) => {
        try {
            console.log(props)
            var res = await axios.post("/api/user/history",
                { "video": { ...props } },
                {
                    headers: { authorization: localStorage.getItem("jafnaToken") }
                });
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div onClick={()=>AddToHistoryHandler(props)}>
       
            <div className="card cart-card">
                <Link to="/video/watch" state={props}>
                        <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                        <div className="card-content">
                            <div className="card-body">
                                <span className="text-grey elipsis">{snippet.title}</span>
                                {snippet.channelTitle}
                    
                            <h2> <ViewCount viewCount={statistics.viewCount}/></h2>
                            </div>
                    </div>
                </Link>    
                        {/* <div className="card-footer">
                            <div className="card-footer-view">
                                <button onClick={()=>{WatchVideoHandler(props)}}>Add to Cart</button>
                            </div>
                        </div> */}
                <span className=" badge topright-badge " onClick={()=>{AddVideoToFavourite(props)}}>
                        <IcOutlineWatchLater/>
                </span>
            </div>
           
        </div>
    )
}

export default VideoCards;