import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const videoContext = createContext([]);

const VideoProvider = ({ children }) => {
	const [videoContextList, setVideoContextList] = useState([]);
	useEffect(() => {
		try {
		  (async () => {
			var res = await axios.get("/api/videos");
			setVideoContextList(res.data.videos);
			console.log(res.data.videos);
		  })()
		}
		catch (error) {
		  console.log("Product list page error", error);
		}
	  }, []);
	return (
		<videoContext.Provider value={{ videoContextList, setVideoContextList }}>
			{" "}
			{children}{" "}
		</videoContext.Provider>
	);
};

export const useVideo = () => useContext(videoContext);

export { VideoProvider };
