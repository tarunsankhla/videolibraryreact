import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import IcBaselineAddTask from '../../components/UI/Icons/IcBaselineAddTask';
import IcOutlineThumbUp from '../../components/UI/Icons/IcOutlineThumbUp';
import IcRoundPlaylistAdd from '../../components/UI/Icons/IcRoundPlaylistAdd';
import IcRoundThumbDownOffAlt from '../../components/UI/Icons/IcRoundThumbDownOffAlt';
import ViewCount from '../../utils/ViewCount.jsx';
import './VideoContent.css';

function VideoContentPage() {
  const location = useLocation();
  const [VideoUrl, setVideoUrl] = useState();
    const data = location.state;
    console.log(data);
  //   const videosrc = "https://www.youtube.com/watch?v=" + data.videoid;
  // const videosrc1 = `https://www.youtube.com/watch?v=${data.videoid}`;
  useEffect(() => {
    setVideoUrl(`https://www.youtube.com/embed/${data.videoid}?autoplay=1&origin=http://example.com`);
  }, [])
  return (
    <div className='video-content-container'>
      <iframe 
        src={VideoUrl}
        className="iframe-video"
        frameBorder="0" type="text\html"
        allow={
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        }
      />
      <div className='video-content-body'>
      
        <div className='video-content-title'>{data.snippet.title}</div>
        <hr />
        <div className='video-content-header'>
          <div className='video-content-action'>
            <div className='video-action'><IcOutlineThumbUp />{data.statistics.likeCount}</div>
            <div className='video-action'><IcRoundThumbDownOffAlt /></div>
            <div className='video-action'><IcRoundPlaylistAdd /> Add to Playlist</div>
            <div className='video-action'><IcBaselineAddTask/> Add to Watch Later</div>
          </div>
          <div>
            {/* <div>{data.contentDetails.duration}</div> */}
          
            <div> <ViewCount viewCount={data.statistics.viewCount}/></div>
          </div>
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