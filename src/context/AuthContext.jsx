import { createContext, useContext, useState } from "react";

const AuthContext = createContext();



const AuthProvider = ( {children})=>{
    const [login,setlogin ] = useState(!!localStorage.getItem("jafnaToken") && !!localStorage.getItem("jafnaUserId"));
    return (
        <AuthContext.Provider value={{ login, setlogin}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext);
export { AuthProvider };