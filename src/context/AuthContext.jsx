import { createContext, useContext, useReducer, useState } from "react";
import { VAR_ENCODE_TOKEN, VAR_USER_DETAILS, VAR_USER_ID } from "../utils/Route";

const AuthContext = createContext();

function userCredentialHandler(state, action) {
    console.log(state, action);
    if (action.email || action.firstName || action.lastName) {
        localStorage.setItem(VAR_USER_DETAILS, JSON.stringify({
            ...state,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName
        }))
        return {
            ...state,
            email: action.email,
            firstName: action.firstName,
            lastName: action.lastName
        }
    }
    return {
        ...state
    }
}

const AuthProvider = ({ children }) => {
    const [login, setlogin] = useState(!!localStorage.getItem(VAR_ENCODE_TOKEN) && !!localStorage.getItem(VAR_USER_ID));
    const [userState, userDispatch] = useReducer(userCredentialHandler, localStorage.getItem(VAR_USER_DETAILS) ? JSON.parse(localStorage.getItem(VAR_USER_DETAILS)) : {
        firstName: "",
        lastName: "",
        email: ""
    })
    return (
        <AuthContext.Provider value={{ login, setlogin, userState, userDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
export { AuthProvider };