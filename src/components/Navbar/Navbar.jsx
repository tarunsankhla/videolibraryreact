import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTE_PATH_LoginPage } from '../../utils/Route';
import LoginButton from '../UI/Buttons/LoginButton/LoginButton';
import "./Navbar.css";

function Navbar() {
  const { login, setlogin } = useAuth();
  console.log("login", login);


  const OnSignOut = () =>{
    setlogin(false);
    localStorage.removeItem("jafnaToken");
    localStorage.removeItem("jafnaUserId");
}
  return (
      <div className='Navbar'>
        <h3 style={{marginLeft:"1em"}}>Jaffna</h3>
      {login ?
        <button className="btn signout-btn text-underLine text-bold" onClick={OnSignOut}> Signout</button>
        : <NavLink to={ROUTE_PATH_LoginPage}><LoginButton /></NavLink>}
    </div>
  )
}

export default Navbar