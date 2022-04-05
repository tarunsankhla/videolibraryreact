import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../../components/UI/Buttons/LoginButton/LoginButton';
import { useAuth } from '../../context/AuthContext';
import {
  HolderImg1,
  HolderImg2,
  HolderImg3,
  HolderImg4,
  HolderImg5,
  HolderImg6,
  HolderImg7,
  HolderImg8,
  HolderImg9
} from "../../assets/Holders/holder";
import "./LoginPage.css";
import Button from '../../components/UI/Buttons/Button/Button';
import { VAR_ENCODE_TOKEN, VAR_USER_DETAILS, VAR_USER_ID } from '../../utils/Route';

function LoginPage() {
  const { login, setlogin, userDispatch } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      var object = { "email": email, "password": password };
      console.log(object);
      var res = await axios.post("/api/auth/login", object);
      if (res.status === 200) {
        var token = res.data.encodedToken;
        localStorage.setItem(VAR_ENCODE_TOKEN, token)
        var user = res.data.foundUser;
        var userId = res.data.foundUser._id;
        localStorage.setItem(VAR_USER_ID, userId);
        let userDetails = { email: res.data.foundUser.email, firstName: res.data.foundUser.firstName, lastName: res.data.foundUser.lastName };
        localStorage.setItem(VAR_USER_DETAILS, JSON.stringify(userDetails));
        userDispatch(userDetails)
        console.log(user, userId, token);
        setlogin(true);
        navigate("/");
      }
      
    }
    catch (error) {
      console.log(error)
    }
  }

  const guestUserDetais = () => { 
    setEmail("adarshbalak@gmail.com");
    setPassword("adarshBalaki123");
  }
  return (
    <>
      <div className='login-main-container'>
        <section className='auth-sidebar'>
          <div className='auth-sidebar-content'>
            <header className='header'>
              <div className='title-name page-title'> <Link to="/">Fleets</Link></div>
              <div>Discover the world around you</div>
            </header>
            <div className='artwork'>
            <img src={HolderImg2} className="holders"/>
            </div>
          </div>
        </section>
        <section className='content'>
          <nav className='auth-nav'>
          <Link className="login-footer lg-txt" to="/signup">Not a member? Sign up now</Link>
          </nav>
          <main>
            <div className="login-container">
              <div className="title-header">

                <div className="login-credential-container">
                  <input placeholder="Email Address - xyz@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login-credential-container">
                  <input type="password" onChange={(e) => setPassword(e.target.value)} name="" placeholder="Password" id="" />
                </div>
                <div className="login-rem-forgetpass-container">
                  <div className='login-action-container md-txt'>
                    <input type="checkbox" name="" id="" />
                    Remember me
                  </div>
                  <a className="btn-link md-txt">Forgot your password?</a>
                </div>
                <div className="login-btn-container">
                  <div className='login-btn-container-body' onClick={onSubmitHandler}><LoginButton /></div>
                </div>
                <div className="login-btn-container">
                  <div className='login-btn-container-body' onClick={guestUserDetais}>
                    <Button name={"Guest User"} />
                  </div>
                </div>
                {/* <Link className="login-footer md-txt" to="/signup">
                  Create New Account <span className="material-icons-round">
                    navigate_next
                  </span>
                </Link> */}
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  )
}
// {
//   "email":"adarshbalika@gmail.com",
//   "password":"adarshBalika123"}
export default LoginPage