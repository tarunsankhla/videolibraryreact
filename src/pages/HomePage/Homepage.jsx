import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import Carousal from '../../components/Carousal/Carousal';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import { useVideo } from '../../context/VideoContext';
import { category as CategoryList} from '../../data/category.data';
import "./Homepage.css";


function Homepage() {
  const [videoLib, setVideoLib] = useState([]);
  const { videoContextList, setVideoContextList } = useVideo();
  const navigate = useNavigate();
    useEffect(() => {
        try {
            (async () => {
              var res = await axios.get("/api/videos");
              console.log(res.data.videos)
              setVideoLib(res.data.videos);
              // setVideoContextList(res.data.videos);
            })()
        } catch (error) {
            console.log("Product list page error", error);
        }
    }, []);
  
  const CategoryHandler = (categoryType) => { 
    navigate(`/explore?type=${categoryType}`)
  }
  return (
    <div>
      <Carousal />
      <div className='category-container'>
        {CategoryList.map((item) => (
        <div className='cateogory-container-item text-align' onClick={()=>CategoryHandler(item.type)} key={item.name}>
          <img src={item.icon} alt="category " loading="lazy"/>
          <p>{ item.name}</p>
        </div>
      ))}</div>
      <hr/>
        <div>
          <div className='category-title big-txt fn-wg-700'>Trending</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'trendings').slice(0, 6).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
      </div>
      <hr/>
      <div>
          <div className='category-title big-txt fn-wg-700'>Entertainment</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'entertainment').slice(0, 6).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
      </div>
      <hr/>
      <div>
          <div className='category-title big-txt fn-wg-700'>React</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'React').slice(0, 6).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
      </div>
      <hr/>
      <div>
          <div className='category-title big-txt fn-wg-700'>Music</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'music').slice(0, 6).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
        </div>
    </div>)
}

export default Homepage
