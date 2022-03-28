import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import LoginButton from '../../components/UI/Buttons/LoginButton/LoginButton';
import { useAuth } from '../../context/AuthContext';
import "./SignupPage.css";

const SignUpDetails = (state,action) =>{
  console.log(state,action);
  console.log(action.email,action.firstName,action.lastName)
  if(action.email){
      return {...state,email : action.email}
  }
  if(action.firstName){
      return {...state,firstName : action.firstName}
  }
  if(action.lastName){
      return {...state,lastName : action.lastName}
  }
  return {...state}
}


function SignupPage() {
  const {login ,setlogin } = useAuth();
  // const [email,setEmail] = useState();
  // const [password,setPassword] = useState();
  const navigate = useNavigate();

  const [passwordCheckError,setPasswordCheckError] = useState(false);
  const [confirmPassword,setConfirmPassword] = useState("");
  const [state,dispatch]= useReducer(SignUpDetails,{
      email : "",
      password : "",
      firstName :"",
      lastName:"",
  });


  function HasAlphabets(letter) {
      for (let i = 0; i < letter.length; i++) {
        let char = letter[i];
        if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
          return true;
        }
      }
    }
    function HasNumber(letter) {
      for (let i = 0; i < letter.length; i++) {
        let char = letter[i];
        if (!isNaN(char)) {
          return true;
        }
      }
    }
    function HasSpecialCharacter(letter) {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  
      if (letter.match(format)) {
        console.log("spe");
        return true;
      } else {
        console.log("sd");
        return false;
      }
    }
    function PasswordCheck(value) {
      console.log(value);
      setConfirmPassword(value);
  
      setPasswordCheckError(HasAlphabets(value) & HasNumber(value) & HasSpecialCharacter(value));
    }

  const onSubmitHandler = async () =>{
    // var object = { "email": email, "password": password };
    var object = {
      "email":state.email,
      "password":confirmPassword,
      "firstName":state.firstName,
      "lastName":state.lastName
  };
    console.log(object)
    var res = await axios.post("/api/auth/signup",object);
    console.log(res);
    if(res.status === 200)
    {
        var token = res.data.encodedToken;
        localStorage.setItem("jafnaToken",token)
        var user = res.data.foundUser;
        var userId =res.data.foundUser._id;
        localStorage.setItem("jafnaUserId",userId);
        console.log(user,userId,token);
        setlogin(true);
        // navigate("/");
        // History.push("/products");   
    }
    navigate("/");
  }


  const onSubmittFunc = async () =>{
    try{
        var object = {
            "email":state.email,
            "password":confirmPassword,
            "firstName":state.firstName,
            "lastName":state.lastName
        };
        console.log(object)
        var res = await axios.post("/api/auth/signup",object);
        console.log(res);   
        if(res.status === 201)
        {
            var token = res?.data?.encodedToken;
            localStorage.setItem("feetz",token)
            var user = res?.data?.createdUser;
            var userId =res?.data?.createdUser._id;
            localStorage.setItem("feetzId",userId);
            console.log(user,userId,token);
            setlogin(true);
            // navigate("/");
            // History.push("/products");   
        }
        if(res.status === 422)
        {
            console.log("Use exist")
        }
    }
    catch(error)
    {
        console.log("signup ",error)
    }
    navigate("/");
  }
  return (
    <>
       <div className='signup-main-container'>
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
          <div className="signup  -container">   
                <div className="title-header">
                   
                    <div className="signup-credential-container">
                        {/* <label>Email Address</label> */}
                        <input placeholder="Email Address - xyz@gmail.com" onChange={(e)=>dispatch({email : e.target.value})} />
                    </div>
                    <div className="signup-credential-container">
                        {/* <label>Password</label> */}
                        <input type="password" style={{ borderColor: passwordCheckError, outlineColor: passwordCheckError }}
                          onChange={(e) => {
                              PasswordCheck(e.target.value);
                            }} name="" placeholder="Password" id="" />
                          <p className='error'>
                            {confirmPassword.length > 0 && confirmPassword.length < 7
                            ? "password should be minimum 7 letter"
                            : ""}
                        </p>
                        <p className='error'>
                            {confirmPassword.length > 0 &&
                            !passwordCheckError &&
                            "Password should contain a number, alphabet & special character"}
                        </p>
                    </div>
                    <div className="signup-credential-container">
                          {/* <label>Confirm Password</label> */}
                          <input type="password" placeholder="Confirm Password" name="" 
                          id="" style={{ borderColor: passwordCheckError, outlineColor: passwordCheckError }}
                          onChange={(e) => {
                              setPasswordCheckError(e.target.value !== confirmPassword ? "red" : "black");
                            }}
                            disabled={passwordCheckError && confirmPassword.length >= 7 ? false : true}/>
                            <p className='error'>{passwordCheckError === "red" && "Confirm Password Should match Password"}</p>
              
                      </div>
                      <div className="signup-credential-container">
                          {/* <label>First Name</label> */}
                          <input type="email" placeholder="First Name" onChange={(e)=>dispatch({firstName : e.target.value})}/>
                      </div>
                      <div className="signup-credential-container">
                          {/* <label>Last Name</label> */}
                          <input type="email" placeholder="Last Name" onChange={(e)=>dispatch({lastName : e.target.value})} />
                      </div>
                      <div className="signup-remember-container">
                          <div>
                              <input type="checkbox" name="" id="" />
                              I accept all Terms & Conditions
                          </div>
                      </div>
                      <div className="signup-btn-container">
                          <button className="btn signup-action-btn" onClick={onSubmittFunc} >Signup</button>
                          </div>
                      <Link className="signup-footer" to="/login">Already have an Account <span className="material-icons-round">
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

export default SignupPage