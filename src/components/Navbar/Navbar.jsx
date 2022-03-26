import React from 'react';
import LoginButton from '../UI/Buttons/LoginButton/LoginButton';
import "./Navbar.css";

function Navbar() {
  return (
      <div className='Navbar'>
          <h3 style={{marginLeft:"1em"}}>Jaffna</h3>
          <LoginButton/>
    </div>
  )
}

export default Navbar