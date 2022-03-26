import React from 'react';
import { Link } from 'react-router-dom';
import ViewCount from '../../../../utils/ViewCount';
import './VideoCards.css';

function VideoCards({props}) {
    const { videoid, snippet, statistics } = props;
    console.log(props,videoid,snippet,statistics)
    const WatchVideoHandler = (props) => { 
        console.log(props);
    }
    const AddVideoToFavourite = (props) => { 
        console.log(props)
    }
    return (
        <>
            <Link to="/video/watch" state={props}>
                <div className="card cart-card">
                        <img className="card-img" src={snippet.thumbnails} alt={snippet.channelTitle} />

                        <div className="card-content">
                            <div className="card-body">
                                <span className="text-grey elipsis">{snippet.title}</span>
                                {snippet.channelTitle}
                            {/* </div>
                            <div className="card-title"> */}
                                {/* <h2>{Number(statistics.viewCount) > 1000 ?
                                    `${Number(statistics.viewCount) % 1000}K`
                                    : Number(statistics.viewCount) > 1000000
                                        ? `${Number(statistics.viewCount) % 1000000}M`
                                        : `${Number(statistics.viewCount) % 1000000}`}views</h2> */}
                            <h2> <ViewCount viewCount={statistics.viewCount}/></h2>
                            </div>
                        </div>
                        {/* <div className="card-footer">
                            <div className="card-footer-view">
                                <button onClick={()=>{WatchVideoHandler(props)}}>Add to Cart</button>
                            </div>
                        </div> */}
                        <span className="material-icons-round badge topright-badge " onClick={()=>{AddVideoToFavourite(props)}}>
                            favorite_border
                        </span>
                        </div>
            </Link>
        </>
    )
}

export default VideoCards