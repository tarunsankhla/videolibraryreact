import React from 'react';
import  "./AsideNav.css"
import IcRoundPlaylistPlay from '../UI/Icons/IcRoundPlaylistPlay';
import IcTwotoneWatchLater from '../UI/Icons/IcTwotoneWatchLater';
import IcTwotoneManageHistory from '../UI/Icons/IcTwotoneManageHistory';
import IcTwotoneHome from '../UI/Icons/IcTwotoneHome';
import IcTwotoneVideoLibrary from '../UI/Icons/IcTwotoneVideoLibrary';
import IcTwotonePlaylistPlay from '../UI/Icons/IcTwotonePlaylistPlay';

function AsideNav() {
  return (
      <div className='AsideNav'>AsideNav
          <IcTwotoneHome />
          <IcTwotoneVideoLibrary/>
          <IcTwotonePlaylistPlay />
          <IcTwotoneWatchLater />
          <IcTwotoneManageHistory/>
      </div>
  )
}

export default AsideNav