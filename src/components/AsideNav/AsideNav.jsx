import React from "react";
import "./AsideNav.css";
import IcRoundPlaylistPlay from "../UI/Icons/IcRoundPlaylistPlay";
import IcTwotoneWatchLater from "../UI/Icons/IcTwotoneWatchLater";
import IcTwotoneManageHistory from "../UI/Icons/IcTwotoneManageHistory";
import IcTwotoneHome from "../UI/Icons/IcTwotoneHome";
import IcTwotoneVideoLibrary from "../UI/Icons/IcTwotoneVideoLibrary";
import IcTwotonePlaylistPlay from "../UI/Icons/IcTwotonePlaylistPlay";
import { NavLink } from "react-router-dom";
import { IcOutlineThumbUp } from "../UI/Icons";

function AsideNav() {
  return (
    <div className="AsideNav">
      <NavLink to="/">
        <div className="aside-nav-row">
          <IcTwotoneHome />
          <span className="icon-handle">Home</span>
        </div>
      </NavLink>

      <NavLink to="/explore">
        <div className="aside-nav-row">
          <IcTwotoneVideoLibrary />
          <span className="icon-handle">Explore</span>
        </div>
      </NavLink>
      <NavLink to="/playlist">
        <div className="aside-nav-row">
          <IcTwotonePlaylistPlay />
          <span className="icon-handle">PlayList</span>
        </div>
      </NavLink>
      <NavLink to="/likes">
        <div className="aside-nav-row">
          <IcOutlineThumbUp />
          <span className="icon-handle">Likes</span>
        </div>
      </NavLink>
      <NavLink to="/watchlater">
        <div className="aside-nav-row">
          <IcTwotoneWatchLater />
          <span className="icon-handle">Watch Later</span>
        </div>
      </NavLink>
      <NavLink to="/history">
        <div className="aside-nav-row">
          <IcTwotoneManageHistory />
          <span className="icon-handle">History</span>
        </div>
      </NavLink>
    </div>
  );
}

export default AsideNav;
