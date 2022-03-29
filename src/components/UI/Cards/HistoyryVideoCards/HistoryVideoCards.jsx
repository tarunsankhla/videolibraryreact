import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from '../../../../context/HistoryContext';
import ViewCount from '../../../../utils/ViewCount';
import IcRoundAutoModeAddWatchLater from '../../Icons/IcRoundAutoMode';
import IcRoundCheckCircleConfirmWatchLater from '../../Icons/IcRoundCheckCircle';
import IcTwotoneDelete from '../../Icons/IcTwotoneDelete';
import "./HistoryVideoCards.css";

function HistoryVideoCards({ props}) {
    const { historyContextArray, setHistoryContextArray } = useHistory();
    const { videoid, snippet, statistics } = props;
    console.log(props, videoid, snippet, statistics)
    const deleteHistoryHandler = async(id) => { 
        try {
            console.log(id)
            var res = await axios.delete(`/api/user/history/${id}`,{ headers:{
                authorization:localStorage.getItem("jafnaToken")}});
            console.log(res);
            // setHistoryContextArray();
            (async() => {
                var res = await axios.get("/api/user/history",{ headers:{
                  authorization:localStorage.getItem("jafnaToken")}});
                console.log(res);
                // console.log(res.data.products);
                setHistoryContextArray(res.data.history);
               
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
                  <span className="material-icons-round badge topright-badge " onClick={() => {deleteHistoryHandler(props._id) }}>
                      <IcTwotoneDelete/>
                      {/* <IcRoundAutoModeAddWatchLater />
                      <IcRoundCheckCircleConfirmWatchLater/> */}
                    </span>
                    </div>
      
    </div>
  )
}

export default HistoryVideoCards