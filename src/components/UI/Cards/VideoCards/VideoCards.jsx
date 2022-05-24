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
import { Toast } from "../../Toast/toast";
import { useAuth } from "../../../../context/AuthContext";
import { IcOutlineThumbUp, IcRoundThumbDownOffAlt } from "../../Icons";
import { useNavigate } from 'react-router';

function VideoCards({props}) {
    const {historyContextArray, setHistoryContextArray} = useHistory();
    const { login, setlogin } = useAuth();
    const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } = useWatchlater();
    const { likesContextArray, setLikesContextArray } = useLikes();
    const { videoid, snippet, statistics } = props;
    const navigate = useNavigate();

     /**
     * The Methdod is to Add video in
     *  watch later
    */
    const AddVideoToWatchLater = async (props) => {
        try {
            if(login){
                console.log(props);
                if (WatchlaterProviderContextArray?.some((item) => item._id === videoid)) {
                    try {
                        var res = await axios.delete(`/api/user/watchlater/${videoid}`, {
                            headers: {
                                authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                            }
                        });
                        console.log(res);
                        setWatchlaterProviderContextArray(res.data.watchlater);
                        Toast("success", " Removed !!");
                    }
                    catch (err) {
                        console.log(err);
                        Toast("error", "Failed to Remove !!");
                    }
                }
                else {
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
                    const { data: {
                        watchlater
                    }, status } = res;
                    console.log(watchlater, status);
                    if (status === 201) {
                        setWatchlaterProviderContextArray(watchlater);
                        Toast("success", "Added to WatchLater")
                    }
                }
            } else {
                Toast("error", "You need to Login!!");
            }
        } catch (error) {
            console.log(error);
            if(error.message.slice(error.message.length-3,error.message.length) === "409")
            {
                Toast("error", "Something suspicious!! The Video Already Exist in WatchLater");
                console.log("Use exist")
            }else{
                Toast("error", "Something went wrong!! try again.");
                console.log("signup ", error, error.status);
          }
        }
    };

    /**
     * The Methdod is to Add video in history
    */
    const AddToHistoryHandler = async (props) => {
        try {
            if (!historyContextArray?.some((item) => item._id === videoid)) {
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
                (async () => {
                    var res = await axios.get("/api/user/history", {
                        headers: {
                            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                        }
                    });
                    console.log(res.data.history);
                    setHistoryContextArray(res.data.history);
        
                })()
            }
            // navigate("/video/watch",{state:props})
        } catch (err) {
            console.log(err);
        }
    };

     // This method is to add likes of video in array
    const LikeHandler = async (props) => {
        try {
        console.log(props, likesContextArray);
        if(login){
            if (likesContextArray?.some((item) => item._id === videoid)) {
            console.log(" there removing itt");
            var res = await axios.delete(`/api/user/likes/${props._id}`,
                {
                headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
                });
                Toast("success", "DisLiked!");
            }
            else {
                console.log("not there adding it");
                var res = await axios.post("/api/user/likes",
                { "video": { ...props } },
                {
                    headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
                    });
                    Toast("success", "Liked!");
            }
            setLikesContextArray(res.data.likes);
            console.log(res)
        } else {
            Toast("error", "You need to Login!!");
        }
    }
    catch (err) {
      console.log(err)
    }
    }
    return (
        <div>
            <div className="card cart-card">
                <Link to="/video/watch"
                    state={props}>
                    <div className="stretch"  onClick={
                                () => AddToHistoryHandler(props)
                            }>
                        <img className="card-img"
                            loading="lazy"
                            src={
                                snippet.thumbnails
                            }
                            alt=""/>

                        <div className="card-content">
                            <div className="card-body">
                                <span className="text-grey elipsis pd-btm">
                                    {snippet.title
                                }</span>
                               
                                <div className="card-body-channel ">
                                    <img className="channel-img" src={snippet.channelImg} alt="channelimg"  loading="lazy"/>
                                    <span className="elipsis md-txt elipsis-md"> {
                                        snippet.channelTitle
                                    }</span>
                                </div>
                                <h2> {" "}
                                    <ViewCount viewCount={
                                        statistics.viewCount
                                    }/>
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>
                <span className=" badge topright-badge video-badge-container">
                    <span   onClick={() => {
                            AddVideoToWatchLater(props);
                        }}>
                        {WatchlaterProviderContextArray?.some((item) => item._id === videoid)
                            ? <IcBaselineAddTask color='var(--boldy-dark-green)'/>
                            : <IcOutlineWatchLater color='var(--boldy-dark-green)' />}
                    </span>
                    <span className="like-badge"  onClick={() => {
                            LikeHandler(props);
                        }}>
                        {likesContextArray?.some((item) => item._id === videoid)
                            ? <IcRoundThumbDownOffAlt color={"#27474e"} />
                            : <IcOutlineThumbUp />}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default VideoCards;
