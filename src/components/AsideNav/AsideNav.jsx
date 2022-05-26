import React from "react";
import "./AsideNav.css";
import {IcTwotoneWatchLater, IcTwotoneManageHistory, IcTwotoneHome, IcTwotoneVideoLibrary, IcTwotonePlaylistPlay} from "../UI/Icons";
import { NavLink } from "react-router-dom";
import { IcOutlineThumbUp } from "../UI/Icons";

function AsideNav() {
  const getActiveStyle = ({isActive}) =>({
    color : isActive ?  "var(--primary-color)" : "",
    transform: isActive ?  "scale(1.1)" : "",
    opacity: isActive ? "0.9" : "",
    backgroundColor: isActive ?  "rgba(0, 0, 0, 0.1)" : "",
  })

  return (
    <div className="AsideNav">
      <NavLink to="/" style={getActiveStyle} >
        <div className="aside-nav-row">
          <IcTwotoneHome />
          <span className="icon-handle">Home</span>
        </div>
      </NavLink>

      <NavLink to="/explore" style={getActiveStyle} className="aside-nav-row">
        {/* <div > */}
          <IcTwotoneVideoLibrary />
          <span className="icon-handle">Explore</span>
        {/* </div> */}
      </NavLink>
      <NavLink to="/playlist" style={getActiveStyle} className="aside-nav-row">
        {/* <div > */}
          <IcTwotonePlaylistPlay />
          <span className="icon-handle">PlayList</span>
        {/* </div> */}
      </NavLink>
      <NavLink to="/likes" style={getActiveStyle} className="aside-nav-row">
        {/* <div > */}
          <IcOutlineThumbUp />
          <span className="icon-handle">Likes</span>
        {/* </div> */}
      </NavLink>
      <NavLink to="/watchlater" style={getActiveStyle} className="aside-nav-row">
        {/* <div> */}
          <IcTwotoneWatchLater />
          <span className="icon-handle">WatchLater</span>
        {/* </div> */}
      </NavLink>
      <NavLink to="/history" style={getActiveStyle} className="aside-nav-row">
        {/* <div> */}
          <IcTwotoneManageHistory />
          <span className="icon-handle">History</span>
        {/* </div> */}
      </NavLink>
    </div>
  );
}

export default AsideNav;
