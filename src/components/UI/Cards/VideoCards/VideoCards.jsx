import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";
import {useHistory} from "../../../../context/HistoryContext";
import {useLikes} from "../../../../context/LikesContext";
import ViewCount from "../../../../utils/ViewCount";
import IcOutlineWatchLater from "../../Icons/IcOutlineWatchLater";
import IcRoundCheckCircleConfirmWatchLater from "../../Icons/IcRoundCheckCircle";
import IcBaselineAddTask from "../../Icons/IcBaselineAddTask";
import "./VideoCards.css";
import { useWatchlater } from "../../../../context/WatchLaterContext";
import {VAR_ENCODE_TOKEN} from "../../../../utils/Route";

function VideoCards({props}) {
    const {historyContextArray, setHistoryContextArray} = useHistory();

    const {WatchlaterProviderContextArray, setWatchlaterProviderContextArray} = useWatchlater();
    const {videoid, snippet, statistics} = props;
    const WatchVideoHandler = (props) => {
        console.log(props);
    };
    const AddVideoToFavourite = async (props) => {
        try {
            console.log(props);
            var res = await axios.post("/api/user/watchlater", {
                video: {
                    ...props
                }
            }, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
            const {data: {
                    watchlater
                }, status} = res;
            console.log(watchlater, status);
            if (status === 201) {
                setWatchlaterProviderContextArray(watchlater);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const AddToHistoryHandler = async (props) => {
        try {
            console.log(props);
            var res = await axios.post("/api/user/history", {
                video: {
                    ...props
                }
            }, {
                headers: {
                    authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                }
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div onClick={
            () => AddToHistoryHandler(props)
        }>
            <div className="card cart-card">
                <Link to="/video/watch"
                    state={props}>
                    <div className="stretch">
                        <img className="card-img"
                            src={
                                snippet.thumbnails
                            }
                            alt={
                                snippet.channelTitle
                            }/>

                        <div className="card-content">
                            <div className="card-body">
                                <span className="text-grey elipsis">
                                    {
                                    snippet.title
                                }</span>
                               
                               <span className="elipsis"> {
                                snippet.channelTitle
                            }</span>

                                <h2> {" "}
                                    <ViewCount viewCount={
                                        statistics.viewCount
                                    }/>
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>
                {/* <div className="card-footer">
                            <div className="card-footer-view">
                                <button onClick={()=>{WatchVideoHandler(props)}}>Add to Cart</button>
                            </div>
                        </div> */}
                <span className=" badge topright-badge "
                    onClick={
                        () => {
                            AddVideoToFavourite(props);
                        }
                }>
                    {
                    WatchlaterProviderContextArray?.some((item) => item._id === videoid) ? <IcBaselineAddTask/>: <IcOutlineWatchLater/>
                } </span>
            </div>
        </div>
    );
}

export default VideoCards;
