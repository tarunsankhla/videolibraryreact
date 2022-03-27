import { createContext, useContext, useState } from "react";


const watchlatercontext = createContext([]);

const WatchlaterProvider = ({ children }) => { 
    const [WatchlaterProviderContextArray, setWatchlaterProviderContextArray] = useState([]);
    return (
        <watchlatercontext.Provider value={{WatchlaterProviderContextArray,setWatchlaterProviderContextArray}}>
            {children}
        </watchlatercontext.Provider>
    )
}

export const useWatchlater = () => useContext(watchlatercontext);
export { WatchlaterProvider };