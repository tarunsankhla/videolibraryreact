import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../../components/UI/Buttons/LoginButton/LoginButton';
import { useAuth } from '../../context/AuthContext';
import "./LoginPage.css";

function LoginPage() {
  const { login, setlogin } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      var object = { "email": email, "password": password };
      var res = await axios.post("/api/auth/login", object);
      if (res.status === 200) {
        var token = res.data.encodedToken;
        localStorage.setItem("jafnaToken", token)
        var user = res.data.foundUser;
        var userId = res.data.foundUser._id;
        localStorage.setItem("jafnaUserId", userId);
        console.log(user, userId, token);
        setlogin(true);
      }
      // navigate("/");
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='login-main-container'>
        <section className='auth-sidebar'>
          <div className='auth-sidebar-content'>
            <header>
              <h3>Jaffna</h3>
              <h2>Discover the world around you</h2>

            </header>
            <div className='artwork'></div>
          </div>
        </section>
        <section className='content'>
          <nav className='auth-nav'>
            <p>Not a member? Sign up now</p>
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
                  <div className='md-txt'>
                    <input type="checkbox" name="" id="" />
                    Remember me
                  </div>
                  <a className="btn-link md-txt">Forgot your password?</a>
                </div>
                <div className="login-btn-container">
                  <div className='login-btn-container-body' onClick={onSubmitHandler}><LoginButton /></div>
                </div>
                <Link className="login-footer md-txt" to="/signup">
                  Create New Account <span className="material-icons-round">
                    navigate_next
                  </span>
                </Link>
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