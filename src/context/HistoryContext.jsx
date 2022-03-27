import { createContext, useContext, useState } from "react";


const historycontext = createContext([]);

const HistoryProvider = ({ children }) => { 
    const [historyContextArray, setHistoryContextArray] = useState([]);
    return (
        <historycontext.Provider value={{historyContextArray,setHistoryContextArray}}>
            {children}
        </historycontext.Provider>
    )
}

export const useHistory = () => useContext(historycontext);
export { HistoryProvider };