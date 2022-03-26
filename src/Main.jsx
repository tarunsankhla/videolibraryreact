import React from 'react';
import { Outlet } from 'react-router';
import "./App.css";
import AsideNav from './components/AsideNav/AsideNav';
import Navbar from './components/Navbar/Navbar';

function Main() {
  return (
    <>
      <div className='main-container'>
        <Navbar />
        <div className='main-body'>
          <AsideNav/>
          <Outlet />
        </div>
      </div>
      </>
  )
}

export default Main