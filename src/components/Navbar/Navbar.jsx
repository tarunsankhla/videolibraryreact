import { IMAGES } from "../../assets";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {ROUTE_PATH_LoginPage, ROUTE_PATH_ProfilePage, VAR_ENCODE_TOKEN} from "../../utils/Route";
import LoginButton from "../UI/Buttons/LoginButton/LoginButton";
import {IcOutlineLogout} from "../UI/Icons/index";
import "./Navbar.css";

function Navbar() {
    const {login, setlogin, userState} = useAuth();
    const navigate = useNavigate();
    console.log("login", login, userState);

    const OnSignOut = () => {
        setlogin(false);
        localStorage.removeItem(VAR_ENCODE_TOKEN);
        localStorage.removeItem("FleetsUserId");
        localStorage.removeItem("FleetsUserDetails");
        navigate("/login");
    };
    return (
        <div className="Navbar">
            <div className="flex align-center ">
                <img src={IMAGES.logoPNG} className="logo" />
                <h3 style={{ marginLeft: "1em",color:"var(--primary-dark-color)" }} className="title-name">
                    Fleets
                </h3>
            </div>
            <div className="navbar-container">
                {
                    login ? ( <button className="btn signout-btn  text-bold normal-btn"
                            onClick={OnSignOut}>
                            Signout
                            <IcOutlineLogout/>
                        </button> ) : (
                        <NavLink to={ROUTE_PATH_LoginPage}>
                            <LoginButton/>
                        </NavLink>)
                }
                <div onClick={() => {navigate(ROUTE_PATH_ProfilePage) }}
                    style={ {cursor: "pointer"}}>
                    {" "}
                    { login && (
                        <div className="profile-initials">
                            {userState?.firstName[0]?.toString().toUpperCase() || "" }
                                {userState?.lastName[0]?.toString().toUpperCase() || ""}
                        </div>
                    )}
                    {" "}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
