import { createContext, useContext, useState } from "react";

const videoContext = createContext([]);

const VideoProvider = ({ children }) => {
	const [videoContextList, setVideoContextList] = useState([]);
	return (
		<videoContext.Provider value={{ videoContextList, setVideoContextList }}>
			{" "}
			{children}{" "}
		</videoContext.Provider>
	);
};

export const useVideo = () => useContext(videoContext);

export { VideoProvider };
