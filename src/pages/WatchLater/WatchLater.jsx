import axios from "axios";
import React, { useEffect } from "react";
import VideoCards from "../../components/UI/Cards/VideoCards/VideoCards";
import WatchLaterVideoCards from "../../components/UI/Cards/WatchLaterVideoCards/WatchLaterVideoCards";
import { useWatchlater } from "../../context/WatchLaterContext";
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
import "./WatchLater.css";
import { VAR_ENCODE_TOKEN } from "../../utils/Route";

function WatchLater() {
	const { WatchlaterProviderContextArray, setWatchlaterProviderContextArray } =useWatchlater();
	useEffect(() => {
		try {
			(async () => {
				var res = await axios.get("/api/user/watchlater", {
					headers: {
						authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
					},
				});
				console.log(res);
				// console.log(res.data.products);
				setWatchlaterProviderContextArray(res.data.watchlater);
			})();
		} catch (error) {
			console.log("Product list page error", error);
		}
	}, []);
	return (
        <div className="watchlater-container">
            <div className="page-title">WatchLater</div>
			<div className="watchlater-list-container">
				{" "}
				{WatchlaterProviderContextArray.length === 0 ? (
				<div className='nocontent'>
						<div className='page-title md-txt' >No Items in Watch Later Explore the App and Comeback here.</div>
						<img src={HolderImg3} className="holders" />
						</div>
				) : (
					WatchlaterProviderContextArray?.map((item) => (
						<WatchLaterVideoCards key={item.id} props={item} />
					))
				)}{" "}
			</div>
			{/* <div style={{margin:"3em"}}>
				<img src={HolderImg1} className="holders"/>
				<img src={HolderImg2} className="holders" />
				<img src={HolderImg3} className="holders" />
				<img src={HolderImg4} className="holders"/>
        <img src={HolderImg5} className="holders"/>
        <img src={HolderImg6} className="holders"/>
        <img src={HolderImg7} className="holders"/>
        <img src={HolderImg8} className="holders"/>
        <img src={HolderImg9} className="holders"/>
			</div> */}
		</div>
	);
}
export default WatchLater;
