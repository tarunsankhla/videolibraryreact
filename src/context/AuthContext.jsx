import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

function userCredentialHandler(state, action) {
    console.log(state, action);
    if (action.email || action.firstName || action.lastName) {
        localStorage.setItem("FleetsUserDetails", JSON.stringify({
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
    const [login, setlogin] = useState(!!localStorage.getItem("FleetsToken") && !!localStorage.getItem("FleetsUserId"));
    const [userState, userDispatch] = useReducer(userCredentialHandler, localStorage.getItem("FleetsUserDetails") ? JSON.parse(localStorage.getItem("FleetsUserDetails")) : {
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