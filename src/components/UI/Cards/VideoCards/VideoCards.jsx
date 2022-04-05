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

function VideoCards({props}) {
    const {historyContextArray, setHistoryContextArray} = useHistory();
    const { login, setlogin } = useAuth();
    const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } = useWatchlater();
    const { likesContextArray, setLikesContextArray } = useLikes();
    const {videoid, snippet, statistics} = props;
    const WatchVideoHandler = (props) => {
        console.log(props);
    };
    const AddVideoToFavourite = async (props) => {
        try {
            if(login){
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
                Toast("success","Added to WatchLater")
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
                <span className=" badge topright-badge video-badge-container">
                 <span   onClick={
                        () => {
                            AddVideoToFavourite(props);
                        }
                }>
                    {
                    WatchlaterProviderContextArray?.some((item) => item._id === videoid) ? <IcBaselineAddTask/>: <IcOutlineWatchLater/>
                        }</span>
                 <span className="like-badge"  onClick={
                        () => {
                            LikeHandler(props);
                        }}>
                   
                        {likesContextArray?.some((item) => item._id === videoid) ? <IcRoundThumbDownOffAlt color={"#27474e"} /> : <IcOutlineThumbUp /> }
                    </span>
                </span>
            </div>
        </div>
    );
}

export default VideoCards;
