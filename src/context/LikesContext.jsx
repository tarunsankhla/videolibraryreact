import { createContext, useContext, useState } from "react";


const likescontext = createContext([]);

const LikesProvider = ({ children }) => { 
    const [likesContextArray, setLikesContextArray] = useState([]);
    return (
        <likescontext.Provider value={{likesContextArray,setLikesContextArray}}>
            {children}
        </likescontext.Provider>
    )
}

export const useLikes = () => useContext(likescontext);
export { LikesProvider };