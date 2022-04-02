import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import Carousal from '../../components/Carousal/Carousal';
import VideoCards from '../../components/UI/Cards/VideoCards/VideoCards';
import { category as CategoryList} from '../../data/category.data';
import "./Homepage.css";


function Homepage() {
  const [videoLib, setVideoLib] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        try {
            (async () => {
                var res = await axios.get("/api/videos");
                setVideoLib(res.data.videos);
            })()
        } catch (error) {
            console.log("Product list page error", error);
        }
    }, []);
  
  const CategoryHandler = (categoryType) => { 
    navigate(`/explore?type=${categoryType}`)
  }
    return (<div>
      <Carousal />
      <div className='category-container'>
        {CategoryList.map((item) => (
        <div className='cateogory-container-item' onClick={()=>CategoryHandler(item.type)} key={item.name}>
          <div><img src={item.icon} alt="category "/></div>
          <div>{ item.name}</div>
        </div>
      ))}</div>
      <hr/>
        <div>
          <div className='category-title'>Trending</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'trendings').slice(0, 3).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
      </div>
      <div>
          <div className='category-title'>Entertainment</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'entertainment').slice(0, 3).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
      </div>
      <div>
          <div className='category-title'>React</div>
            <div className='videolist-container'> {
                videoLib.filter((videoObj) => videoObj.snippet.tags === 'React').slice(0, 3).map((item) => (<VideoCards key={
                        item.id
                    }
                    props={item}/>))
            } </div>
        </div>
    </div>)
}

export default Homepage
