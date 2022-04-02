import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {ROUTE_PATH_LoginPage} from "../../utils/Route";
import LoginButton from "../UI/Buttons/LoginButton/LoginButton";
import IcOutlineLogout from "../UI/Icons/IcOutlineLogout";
import "./Navbar.css";

function Navbar() {
    const {login, setlogin, userState} = useAuth();
    const navigate = useNavigate();
    console.log("login", login, userState);

    const OnSignOut = () => {
        setlogin(false);
        localStorage.removeItem("FleetsToken");
		localStorage.removeItem("FleetsUserId");
		localStorage.removeItem("FleetsUserDetails");
        navigate("/login");
    };
    return (<div className="Navbar">
        <h3 style={
            {marginLeft: "1em"}
        } className="title-name">Fleets</h3>
        <div className="navbar-container"> {
            login ? (<button className="btn signout-btn  text-bold normal-btn"
                onClick={OnSignOut}>
                Signout
                <IcOutlineLogout/>
            </button>) : (<NavLink to={ROUTE_PATH_LoginPage}>
                <LoginButton/>
            </NavLink>)
        }
            <div> {" "}
                {
                login && (<div className="profile-initials"> {
                    userState?.firstName[0]?.toString().toUpperCase() || ""
                }
                    {
                    userState?.lastName[0]?.toString().toUpperCase() || ""
                } </div>)
            }
                {" "} </div>
        </div>
    </div>);
}

export default Navbar;
