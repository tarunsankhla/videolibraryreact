import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

function userCredentialHandler(state, action) {
    console.log(state, action);
    if (action.email || action.firstName || action.lastName) {
        localStorage.setItem("JafnaUserDetails", JSON.stringify({
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
    const [login, setlogin] = useState(!!localStorage.getItem("jafnaToken") && !!localStorage.getItem("jafnaUserId"));
    const [userState, userDispatch] = useReducer(userCredentialHandler, localStorage.getItem("JafnaUserDetails") ? JSON.parse(localStorage.getItem("JafnaUserDetails")) : {
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