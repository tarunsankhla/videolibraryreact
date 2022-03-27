import { createContext, useContext, useState } from "react";


const playlistcontext = createContext([]);

const PlayListProvider = ({ children }) => { 
    const [playListContextArray, setPlayListContextArray] = useState([]);
    return (
        <playlistcontext.Provider value={{playListContextArray,setPlayListContextArray}}>
            {children}
        </playlistcontext.Provider>
    )
}

export const usePlayList = () => useContext(playlistcontext);
export { PlayListProvider };