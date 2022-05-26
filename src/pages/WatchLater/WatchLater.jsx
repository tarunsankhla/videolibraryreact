import axios from "axios";
import React, { useEffect } from "react";
import VideoCards from "../../components/UI/Cards/VideoCards/VideoCards";
import WatchLaterVideoCards from "../../components/UI/Cards/WatchLaterVideoCards/WatchLaterVideoCards";
import { useWatchlater } from "../../context/WatchLaterContext";
import {
	HolderImg1,
	HolderImg2,
	HolderImg3,
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
				setWatchlaterProviderContextArray(res.data.watchlater);
			})();
		} catch (error) {
			console.log("Product list page error", error);
		}
	}, []);
	return (
        <div className="watchlater-container">
			<div className="page-title">WatchLater</div>
			<hr/>
			<div className="watchlater-list-container">
				{" "}
				{WatchlaterProviderContextArray.length === 0 ? (
				<div className='nocontent'>
						<div className='page-title md-txt' >No Items in Watch Later Explore the App and Comeback here.</div>
						<img src={HolderImg3} loading="lazy" className="holders" alt="watchleterlogo"/>
						</div>
				) : (
					WatchlaterProviderContextArray?.map((item) => (
						<WatchLaterVideoCards key={item.id} props={item} />
					))
				)}{" "}
			</div>
		</div>
	);
}
export default WatchLater;
