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

function VideoListingPage() {
  const [videoLib, setVideoLib] = useState([]);
  const { videoContextList, setVideoContextList } = useVideo();
  const [category, setCategory] = useState();
  const categories = ["music", "shoes", "React", "entertainment", "bollywood", "sports","trendings"];
  //music shoes technology  entertainment bollywood sports trendings 
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      console.log("in use set", category, videoContextList)
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
   },[category])
  useEffect(() => {
    try {
      (async () => {
        var res = await axios.get("/api/videos");
        console.log(res);
        // console.log(res.data.products);
        setVideoLib(res.data.videos);
        setVideoContextList(res.data.videos);
      })()


      console.log(location.search.split("=")[1])
      if (!!location.search.split("=")[1]) {
        console.log("in use")
        setTimeout(() => {
          setCategory(location.search.split("=")[1]);
        }, 1000);
    }
    }
    catch (error) {
      console.log("Product list page error", error);
    }
  }, []);

  const filterHandler = (item) => { 
    setCategory((prev)=> prev === item ? "" : item);
    // setVideoLib([...videoContextList?.filter((videoObj) =>   videoObj.snippet.tags === item)])
  }
  return (
    <div className='full-width'>
      {/* <div className='categories-batch-container'>
        {
          categories.map((item) => (
            <span className='categories-batch' onClick={()=>filterHandler(item)}> {item}</span>
          ))
        }
      </div> */}
      <ul className='icons-cateogry-layer'>
        {CategoryList.map((item) => (
          <li className='cateogory-container-batch-icons' onClick={()=>filterHandler(item.type)} key={item.name}>
            <img src={item.icon} alt="category "/>
            { item.name}
          </li>
        ))}
      </ul>
      <div className='videolist-container'>
        {
        videoLib.length !== 0 ?  videoLib.map((item) => (
            <VideoCards key={item.id} props={item} />
        )) : <div>  "Loading ......"
            <img src={HolderImg8} className="holders" alt='lodderLogo' /></div>
        }
      </div>
    </div>
  )
}

export default VideoListingPage