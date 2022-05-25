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
import { Toast } from '../../components/UI/Toast/toast';

function LoginPage() {
  const { login, setlogin, userDispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
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
        Toast("success","logged in successfully!!")
        navigate(-1);
      }
      
    }
    catch (error) {
      console.log(error);
      Toast("error", "Check you Credentials!! try again.");
      console.log("signup ", error, error.status);
    }
  }

  const guestUserDetais = async (e) => { 
    setEmail("adarshbalak@gmail.com");
    setPassword("adarshBalaki123");
    e.preventDefault();
    try {
      var object = { "email": "adarshbalak@gmail.com", "password": "adarshBalaki123" };
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
        Toast("success","logged in successfully!!")
        navigate(-1);
      }
      
    }
    catch (error) {
      console.log(error);
      Toast("error", "Check you Credentials!! try again.");
      console.log("signup ", error, error.status);
    }
  }
  return (
    <>
      <div className='login-main-container font-family'>
        <section className='auth-sidebar'>
          <div className='auth-sidebar-content'>
            <header className='header'>
              <div className='title-name page-title'>
                <p className='xxlg-txt fn-wg-700 hover' onClick={()=>navigate("/")}>Fleets</p>
              </div>
              <p >Discover the world around you</p>
            </header>
            <div className='artwork'>
            <img src={HolderImg2} className="holders" loading="lazy"/>
            </div>
          </div>
        </section>
        <section className='content'>
          <nav className='auth-nav'>
            <p className="login-footer lg-txt cta-txt underline fn-wg-700" onClick={() => navigate("/signup")}>Not a member? Sign up now</p>
          </nav>
          <main>
            <div className="login-container">
              <form className="title-header" onSubmit={onSubmitHandler}>
                <input placeholder="Email Address - xyz@gmail.com" className='login-credential-container fn-wg-600'
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" onChange={(e) => setPassword(e.target.value)} className="login-credential-container fn-wg-600"
                  value={password} name="" placeholder="Password" id="" />

                {/* <div className="login-rem-forgetpass-container">
                  <div className='login-action-container md-txt'>
                    <input type="checkbox" name="" id="" />
                    Remember me
                  </div>
                  <p className="btn-link md-txt">Forgot your password?</p>
                </div> */}
               
                {/* <div className="login-btn-container">
                  <div className='login-btn-container-body' onClick={onSubmitHandler}><LoginButton /></div>
                </div> */}
                
                {/* <div className="login-btn-container">
                  <div className='login-btn-container-body' onClick={guestUserDetais}>
                    <Button name={"Guest User"} />
                  </div>
                </div> */}
                <div className='flex-center pd-10 '>
                  <button type="submit" className="action-btn">Login</button>
                  <button className="action-btn" onClick={guestUserDetais}> Guest User</button>
                </div>
              </form>
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