import React from "react";
import "./AsideNav.css";
import IcTwotoneWatchLater from "../UI/Icons/IcTwotoneWatchLater";
import IcTwotoneManageHistory from "../UI/Icons/IcTwotoneManageHistory";
import IcTwotoneHome from "../UI/Icons/IcTwotoneHome";
import IcTwotoneVideoLibrary from "../UI/Icons/IcTwotoneVideoLibrary";
import IcTwotonePlaylistPlay from "../UI/Icons/IcTwotonePlaylistPlay";
import { NavLink } from "react-router-dom";
import { IcOutlineThumbUp } from "../UI/Icons";

function AsideNav() {
  const getActiveStyle = ({isActive}) =>({
    color : isActive ?  "#539987" : "",
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
          <span className="icon-handle">Watch Later</span>
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
