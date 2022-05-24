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
import {
	HolderImg1,
	HolderImg2,
	HolderImg3,
	HolderImg4,
	HolderImg5,
	HolderImg6,
	HolderImg7,
	HolderImg8,
	HolderImg9,
} from "../../assets/Holders/holder";
import { Toast } from '../../components/UI/Toast/toast';
import { useVideo } from '../../context/VideoContext';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import { Link } from 'react-router-dom';

function VideoContentPage() {
  const location = useLocation();
  const [VideoUrl, setVideoUrl] = useState();
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const { likesContextArray, setLikesContextArray } = useLikes();
  const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } = useWatchlater();
  const { login, setlogin } = useAuth();
  const { videoContextList, setVideoContextList } = useVideo();
  const data = location.state;
  console.log(data);
  useEffect(() => {
    setVideoUrl(`https://www.youtube.com/embed/${data.videoid}?autoplay=1&origin=http://example.com`);
  }, data);

  const AddToWatchlateHandler = async (props) => {
    try {
      if (login) {
        if (WatchlaterProviderContextArray?.some((item) => item._id === data.videoid)) {
          try {
              var res = await axios.delete(`/api/user/watchlater/${data.videoid}`, {
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

    } catch (err) {
      console.log(err)
    }
  }

  // This method is to add likes of video in array
  const LikeHandler = async (props) => {
    try {
      if(login){
        if (likesContextArray?.some((item) => item._id === data._id)) {
          var res = await axios.delete(`/api/user/likes/${props._id}`,
            {
              headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
            });
        }
        else {
            var res = await axios.post("/api/user/likes",
              { "video": { ...props } },
              {
                headers: { authorization: localStorage.getItem(VAR_ENCODE_TOKEN) }
              });
        }
        setLikesContextArray(res.data.likes);
      } else {
        Toast("error", "You need to Login!!");
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const NotLoginErrorHandler = () => { 
    if (login) {
      setShowPlayListModal((prev) => !prev);
    }
    else {
      Toast("error", "You need to login!!");
    }
  }
  return (
    <div className='full-width'>
      <div>
        {
          data ?
            <div className='video-content-container'>
              <iframe
                src={`https://www.youtube.com/embed/${data.videoid}?autoplay=1&origin=http://example.com`}
                className="iframe-video"
                frameBorder="0" type="text\html"
                allow={
                  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                }
                title="video" id='ytplayer'
              />
              <div className='video-content-body'>

                <div className='video-content-title'>{data.snippet.title}</div>
                <hr />
                <div className='video-content-header'>
                  <div className='video-content-action'>
                    <div className='video-action' onClick={() => LikeHandler(data)}>
                      {likesContextArray?.some((item) => item._id === data._id) ? <IcRoundThumbDownOffAlt /> : <IcOutlineThumbUp />}
                      {data.statistics.likeCount}
                    </div>
                    <div className='video-action' onClick={() => NotLoginErrorHandler()}><IcRoundPlaylistAdd />
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
                 
                      {WatchlaterProviderContextArray?.some((item) => item._id === data._id) ? <IcBaselineAddTask /> : <IcOutlineWatchLater />}Add to Watch Later
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
                  <div className='channel-title'>
                    <img className="channel-img" src={data.snippet.channelImg} alt="channelimg" loading="lazy" />
                    {data.snippet.channelTitle}
                  </div>
                  <p className='text-start lg-txt'>
                    <p className='md-txt'>Published :</p> {data?.snippet?.publishedAt.split("T")[0]}
                  </p>
                  <div className='video-description-container'>Description :
                    <div className='video-description'>{data.snippet.description}</div>
                  </div>
                 
                  {/* <p className='text-start'>comments : {data.statistics.commentCount}.</p> */}
                </div>

              </div>
            </div>
            :
            <div className='nocontent'>
              <div className='page-title md-txt' >No Items in Watch Later Explore the App and Comeback here.</div>
              <img src={HolderImg3} className="holders" loading="lazy" alt="watchleterlogo" />
            </div>
        }
      </div>
      <div className='videolist-container'>
        <div className="page-title md-txt">
          Explore More
        </div>
        <div className='videolist-container'>
        {
          videoContextList.length !== 0
              ? videoContextList.map((item) => (
                <p onClick={() => { 
                  document.body.scrollTop =0;
                  document.documentElement.scrollTop =0;
                }}>
              <VideoCards key={item.id} props={item} /></p>))
            : <div className='nocontent'>
                <div className='page-title md-txt'>Loading ...</div>
              <img src={HolderImg8} loading="lazy" className="holders" alt='lodderLogo' />
            </div>
          }
          </div>
      </div>
    </div>
  )
}

export default VideoContentPage