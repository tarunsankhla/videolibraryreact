import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTE_PATH_LoginPage } from '../../utils/Route';
import LoginButton from '../UI/Buttons/LoginButton/LoginButton';
import IcOutlineLogout from '../UI/Icons/IcOutlineLogout';
import "./Navbar.css";

function Navbar() {
  const { login, setlogin } = useAuth();
  const navigate = useNavigate();
  console.log("login", login);


  const OnSignOut = () => {
    setlogin(false);
    localStorage.removeItem("jafnaToken");
    localStorage.removeItem("jafnaUserId");
    navigate("/login")
  }
  return (
    <div className='Navbar'>
      <h3 style={{ marginLeft: "1em" }}>Jaffna</h3>
      {login ?
        <button className="btn signout-btn  text-bold normal-btn" onClick={OnSignOut}> Signout <IcOutlineLogout /></button>
        : <NavLink to={ROUTE_PATH_LoginPage}><LoginButton /></NavLink>}
    </div>
  )
}

export default Navbar