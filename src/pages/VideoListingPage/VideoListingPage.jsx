import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import { useVideo } from '../../context/VideoContext';
import {
  HolderImg1,
  HolderImg2,
  HolderImg3,
  HolderImg4,
  HolderImg5,
  HolderImg6,
  HolderImg7,
  HolderImg8,
  HolderImg9
} from "../../assets/Holders/holder";
import "./VideoListingPage.css";
import { category as CategoryList } from '../../data/category.data';
import { URL } from 'uuid/dist/v35';
import { IcRoundCancel } from '../../components/UI/Icons';

function VideoListingPage() {
  const [videoLib, setVideoLib] = useState([]);
  const [defaultVideoLib, setdefaultVideoLib] = useState([]);
  const [query, setQuery] = useState("");
  const [result,setresult] = useState(false)
  const { videoContextList, setVideoContextList } = useVideo();
  const [category, setCategory] = useState();
  const categories = ["music", "shoes", "React", "entertainment", "bollywood", "sports","trendings"];
  //music shoes technology  entertainment bollywood sports trendings 
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      console.log("in use set", category, videoContextList);
      if (category === undefined) {
        if (!!location.search.split("=")[1]) {
          console.log([...videoContextList?.filter((videoObj) => videoObj.snippet.tags === location.search.split("=")[1])]);
          setVideoLib([...videoContextList?.filter((videoObj) => videoObj.snippet.tags === location.search.split("=")[1])]);
        }
      }
      else if (category.length !== 0) {
        setVideoLib([...videoContextList?.filter((videoObj) => videoObj.snippet.tags === category)])
      } else {
        setVideoLib([...videoContextList])
      }
    }, 1000);
  }, [category]);

  useEffect(() => {
    try {
      (async () => {
        var res = await axios.get("/api/videos");
        setVideoLib(res.data.videos);
        setVideoContextList(res.data.videos);
        console.log(res.data.videos);
      })()


      console.log(location.search.split("=")[1])
      if (!!location.search.split("=")[1]) {
        console.log("in use")
        setTimeout(() => {
          setCategory(location.search.split("=")[1]);
          setresult(true);
        }, 1000);
    }
    }
    catch (error) {
      console.log("Product list page error", error);
    }
  }, []);

  const filterHandler = (item) => { 
    console.log(category === item
      ? "linear-gradient(192deg, #3b5258 20%, #899ca8)"
    :"linear-gradient(12deg, #3b5258 20%, #899ca8)")
    setCategory((prev)=> prev === item ? "" : item);
  }

  const onchangeSearch = (item) => { 
    setVideoLib([...videoContextList.filter((video) => {
      return (video.snippet.title.toLowerCase().includes(item.toLowerCase())
       || video.snippet.description.toLowerCase().includes(item.toLowerCase())
      || video.snippet.channelTitle.toLowerCase().includes(item.toLowerCase())
      || video.snippet.tags.toLowerCase().includes(item.toLowerCase()) )
      })])
  }
  const searchHandler = (e) => {
    e.preventDefault();
    console.log(query);
    setresult(true)
    console.log([...videoContextList.filter((video) => {
      return (video.snippet.title.toLowerCase().includes(query.toLowerCase())
       || video.snippet.description.toLowerCase().includes(query.toLowerCase())
      || video.snippet.channelTitle.toLowerCase().includes(query.toLowerCase())
      || video.snippet.tags.toLowerCase().includes(query.toLowerCase()) )
    })])
    setVideoLib([...videoContextList.filter((video) => {
      return (video.snippet.title.toLowerCase().includes(query.toLowerCase())
       || video.snippet.description.toLowerCase().includes(query.toLowerCase())
      || video.snippet.channelTitle.toLowerCase().includes(query.toLowerCase())
      || video.snippet.tags.toLowerCase().includes(query.toLowerCase()) )
      })])
  }
  return (
    <div className='full-width'>
      <div>
        <form onSubmit={searchHandler} className="search-form">
          <input className='searchbar' value={query} onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length === 0) { 
              setVideoLib([...videoContextList]);
            } else {
              onchangeSearch(e.target.value);
            }
          }} />
          <span class="material-icons-round" onClick={searchHandler}>
            search
          </span>
          {/* <span class="material-icons-round" onClick={() => {}}>
            cancel
          </span> */}
        </form>
      </div>
      <div className='category-layer-container'>
        <ul className='icons-cateogry-layer'>
          {CategoryList.map((item) => (
            <li className='cateogory-container-batch-icons' style={{
              background: category === item.type
                ? "linear-gradient(192deg, rgb(176 215 255) 20%, rgb(40 44 52))"
              :"linear-gradient(12deg, #3b5258 20%, #899ca8)" }} onClick={() => filterHandler(item.type)}
              key={item.name}>
              <img src={item.icon} loading="lazy" alt="category " className='category-layer-img'/>
              { item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='page-title sm-txt'>{result && `( Search Result : ${videoLib.length}) `  }</div>
      <div className='videolist-container'>
        {
        videoLib.length !== 0 ?  videoLib.map((item) => (
            <VideoCards key={item.id} props={item} />
        )) : <div className='nocontent'> <div className='page-title md-txt'>No Video exist.</div>
            <img src={HolderImg8} loading="lazy" className="holders" alt='lodderLogo' /></div>
        }
      </div>
    </div>
  )
}

export default VideoListingPage