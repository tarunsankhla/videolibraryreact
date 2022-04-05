import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IcOutlineWatchLater, IcTwotoneWatchLater } from '../../components/UI/Icons';
import IcBaselineAddTask from '../../components/UI/Icons/IcBaselineAddTask';
import IcOutlineThumbUp from '../../components/UI/Icons/IcOutlineThumbUp';
import IcRoundPlaylistAdd from '../../components/UI/Icons/IcRoundPlaylistAdd';
import IcRoundThumbDownOffAlt from '../../components/UI/Icons/IcRoundThumbDownOffAlt';
import IcRoundThumbUp from '../../components/UI/Icons/IcRoundThumbUp';
import PlayListViewModal from '../../components/UI/Modal/PlayListViewModal/PlayListViewModal';
import { useLikes } from '../../context/LikesContext';
import { useWatchlater } from '../../context/WatchLaterContext';
import ViewCount from '../../utils/ViewCount.jsx';
import { VAR_ENCODE_TOKEN } from "../../utils/Route";
import './VideoContent.css';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/UI/Toast/toast';

function VideoContentPage() {
  const location = useLocation();
  const [VideoUrl, setVideoUrl] = useState();
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const { likesContextArray, setLikesContextArray } = useLikes();
  const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } = useWatchlater();
  const { login, setlogin } = useAuth();
  const data = location.state;

  useEffect(() => {
    setVideoUrl(`https://www.youtube.com/embed/${data.videoid}?autoplay=1&origin=http://example.com`);
  }, []);

  const AddToWatchlateHandler = async (props) => {
    try {
      console.log(props)
      if (login) {
        var res = await axios.post("/api/user/watchlater",
          { "video": { ...props } },
          {
            headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
          });
        console.log(res);
        const { data: { watchlater }, status } = res;
        console.log(watchlater, status);
        if (status === 201) {
          setWatchlaterProviderContextArray(watchlater);
        }
      } else {
        Toast("error", "You need to Login!!");
      }

    } catch (err) {
      console.log(err)
    }
  }
  const LikeClickedCheck = (id) => {
    console.log(likesContextArray?.some((item) => item._id === id));
  }

  // This method is to add likes of video in array
  const LikeHandler = async (props) => {
    try {
      console.log(props, likesContextArray);
      if(login){
        if (likesContextArray?.some((item) => item._id === data._id)) {
          console.log(" there removing itt");
          var res = await axios.delete(`/api/user/likes/${props._id}`,
            {
              headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
            });
        }
        else {
            console.log("not there adding it");
            var res = await axios.post("/api/user/likes",
              { "video": { ...props } },
              {
                headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
              });
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

  const AdVideoToPlaylistHAndler = () => {

    // 409 video already there
  }
  return (
    <div className='video-content-container'>
      <iframe
        src={VideoUrl}
        className="iframe-video"
        frameBorder="0" type="text\html"
        allow={
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        }
        title="video"
      />
      <div className='video-content-body'>

        <div className='video-content-title'>{data.snippet.title}</div>
        <hr />
        <div className='video-content-header'>
          <div className='video-content-action'>
            <div className='video-action' onClick={() => LikeHandler(data)}>
              {likesContextArray?.some((item) => item._id === data._id) ?<IcRoundThumbDownOffAlt /> : <IcOutlineThumbUp /> }
              {data.statistics.likeCount}
            </div>
            <div className='video-action' onClick={() => setShowPlayListModal((prev) => !prev)}><IcRoundPlaylistAdd />
              Add to Playlist
            </div>
            <div>
              {showPlayListModal &&
                <PlayListViewModal
                  data={data}
                  setPlayListModal={setShowPlayListModal}
                />}
            </div>
            <div className='video-action' onClick={() => AddToWatchlateHandler(data)}>
              {/* <IcBaselineAddTask />
              <IcOutlineWatchLater />
              <IcTwotoneWatchLater /> */}
              { WatchlaterProviderContextArray?.some((item) => item._id === data._id) ?    <IcBaselineAddTask /> :<IcOutlineWatchLater /> }Add to Watch Later
            </div>
          </div>
          <div>
            {/* <div>{data.contentDetails.duration}</div> */}

            <div> <ViewCount viewCount={data.statistics.viewCount} /></div>
          </div>
          {/* toggle of playlist modal */}
        </div>
        <hr />
        <div className='video-content-channel'>
          <div className='channel-title'>{data.snippet.channelTitle}</div>
          <div className='video-description-container'>Description :
            <div className='video-description'>{data.snippet.description}</div>
          </div>
          <div>published on : {data.snippet.publishedAt}</div>
          <div>comments : {data.statistics.commentCount}.</div>
        </div>

      </div>
    </div>
  )
}

export default VideoContentPage