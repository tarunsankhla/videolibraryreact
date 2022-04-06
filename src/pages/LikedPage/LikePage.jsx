import React from 'react';
import "./LikePage.css";
import axios from "axios";
import {useEffect} from "react";
import VideoCards from "../../components/UI/Cards/VideoCards/VideoCards";
import WatchLaterVideoCards from "../../components/UI/Cards/WatchLaterVideoCards/WatchLaterVideoCards";
import {useWatchlater} from "../../context/WatchLaterContext";
import {
    HolderImg3,
} from "../../assets/Holders/holder";
import {VAR_ENCODE_TOKEN} from "../../utils/Route";
import { useLikes } from '../../context/LikesContext';
import LikedVideoCards from '../../components/UI/Cards/LikedVideoCards/LikedVideoCards';

const LikePage = () => {
  const { likesContextArray, setLikesContextArray } = useLikes();
  useEffect(() => {
		try {
			(async () => {
				var res = await axios.get("/api/user/likes", {
					headers: {
						authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
					},
				});
				setLikesContextArray(res.data.likes);
			})();
		} catch (error) {
			console.log("Product list page error", error);
		}
	}, []);
    return (
        <div className="liked-container">
            <div className="page-title">All Your Liked Videos</div>
            <div className="liked-list-container">
                {" "}
                {
                likesContextArray.length === 0 ? (
                    <div className='nocontent'>
                        <div className='page-title md-txt'>Currently No video Liked !!.</div>
                        <img src={HolderImg3}
                            className="holders" alt='holderImg'/>
                    </div>
                ) : (likesContextArray?.map((item) => (
                    <LikedVideoCards key={
                            item.id
                        }
                        props={item}/>
                )))
            }
                {" "} </div>
            </div>
    )
}

export default LikePage
