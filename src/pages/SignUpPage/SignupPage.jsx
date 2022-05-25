import axios from 'axios';
import React, {useReducer, useState} from 'react';
import { useNavigate as navigate } from 'react-router';
import {Link} from 'react-router-dom';
import LoginButton from '../../components/UI/Buttons/LoginButton/LoginButton';
import {useAuth} from '../../context/AuthContext';
import "./SignupPage.css";
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
import Button from '../../components/UI/Buttons/Button/Button';
import { VAR_ENCODE_TOKEN, VAR_USER_DETAILS, VAR_USER_ID } from '../../utils/Route';
import { Toast } from '../../components/UI/Toast/toast';

const SignUpDetails = (state, action) => {
    console.log(state, action);
    console.log(action.email, action.firstName, action.lastName)
    if (action.email) {
        return {
            ...state,
            email: action.email
        }
    }
    if (action.firstName) {
        return {
            ...state,
            firstName: action.firstName
        }
    }
    if (action.lastName) {
        return {
            ...state,
            lastName: action.lastName
        }
    }
    return {
        ...state
    }
}


function SignupPage() {
    const {login, setlogin, userDispatch} = useAuth();
    const [passwordType, setPasswordType] = useState("password");

    const [passwordCheckError, setPasswordCheckError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [state, dispatch] = useReducer(SignUpDetails, {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });


    function HasAlphabets(letter) {
        for (let i = 0; i < letter.length; i++) {
            let char = letter[i];
            if ((char >= "A" && char<= "Z") || (char >= "a" && char <= "z")) {
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

    const onSubmittFunc = async () => {
        try {
            let object = {
                "email": state.email,
                "password": confirmPassword,
                "firstName": state.firstName,
                "lastName": state.lastName
            };
            var res = await axios.post("/api/auth/signup", object);
            console.log(res);
            if (res.status === 201) {
                var token = res?.data?.encodedToken;
                localStorage.setItem(VAR_ENCODE_TOKEN, token)
                var user = res?.data?.createdUser;
                var userId = res?.data?.createdUser?._id;
                localStorage.setItem(VAR_USER_ID, userId);
                let userDetails = { email: res.data.createdUser.email, firstName: res.data.createdUser.firstName, lastName: res.data.createdUser.lastName };
                localStorage.setItem(VAR_USER_DETAILS, JSON.stringify(userDetails));
                userDispatch(userDetails)
                setlogin(true);
                Toast("success", "Sign Up Done!!");
                navigate("/");
                
            }
            
            if (res.status === 422) {
                console.log("Use exist")
            }
            else {
                Toast("error","Check you password I hope it meets all conditions")
            }
            
        } catch (error) {
            console.log(error)
            // Toast("error", "The User Exist or check you credentials!!");
        }
    }


    const PasswordVisibilityHandler = () => { console.log(passwordType);
        setPasswordType((prev) => prev === "password" ? "text" : "password")
        
    }

    const CheckMinimalCharInPassword = () => { 
        return confirmPassword.length > 0 && confirmPassword.length < 7 ? "password should be minimum 7 letter" : "";
    }

    const VerifyPasswordChar = () => { 
        return confirmPassword.length > 0 && !passwordCheckError && "Password should contain a number, alphabet & special character";
    }

    return (<>
        <div className='signup-main-container'>
            <section className='auth-sidebar'>
                <div className='auth-sidebar-content'>
                    <div className='header'> 
                        <div className='title-name page-title'>
                            <Link to="/">Fleets</Link>
                        </div>
                        <p>Discover the world around you</p>
                    </div>
                    <div className='artwork'>
                        <img src={HolderImg7} alt="signuplogo" loading="lazy"
                            className="holders"/>
                    </div>
                </div>
            </section>
            <section className='content'>
                <main>
                    <div className="signup-container">

                        <div className="signup-credential-container"> 
                            <input placeholder="Email Address - xyz@gmail.com"
                                onChange={
                                    (e) => dispatch({email: e.target.value})
                                }/>
                        </div>
                        <div className="signup-credential-container"> 
                            <div className='password-holder'>
                            <input type={passwordType}
                                style={
                                    {
                                        borderColor: passwordCheckError,
                                        outlineColor: passwordCheckError
                                    }
                                }
                                onChange={
                                    (e) => {
                                        PasswordCheck(e.target.value);
                                    }
                                }
                                name=""
                                placeholder="Password"
                                id=""/>{
                                    passwordType === "password" ?
                                        <span className="material-icons-round" onClick={()=>PasswordVisibilityHandler() }>
                                            visibility
                                        </span>
                                        : <span className="material-icons-round" onClick={() => PasswordVisibilityHandler()}>
                                            visibility_off
                                        </span>}
                                        </div>
                            
                            <p className='error'>
                            {CheckMinimalCharInPassword()}
                            </p>
                            <p className='error'>{ VerifyPasswordChar()}</p>
                        </div>
                        <div className="signup-credential-container"> {/* <label>Confirm Password</label> */}
                            <input type="password" placeholder="Confirm Password" name="" id=""
                                style={
                                    {
                                        borderColor: passwordCheckError,
                                        outlineColor: passwordCheckError,
                                        cursor :  passwordCheckError && confirmPassword.length >= 7 ?"pointer" : "not-allowed"  
                                    }
                                }
                                onChange={
                                    (e) => {
                                        setPasswordCheckError(e.target.value !== confirmPassword ? "red" : "black");
                                    }
                                }
                                disabled={
                                    passwordCheckError && confirmPassword.length >= 7 ? false : true
                                }/>
                            <p className='error'> {
                                passwordCheckError === "red" && "Confirm Password Should match Password"
                            }</p>

                        </div>
                        <div className="signup-credential-container"> {/* <label>First Name</label> */}
                            <input type="email" placeholder="First Name"
                                onChange={
                                    (e) => dispatch({firstName: e.target.value})
                                }/>
                        </div>
                        <div className="signup-credential-container"> {/* <label>Last Name</label> */}
                            <input type="email" placeholder="Last Name"
                                onChange={
                                    (e) => dispatch({lastName: e.target.value})
                                }/>
                        </div>
                        <div className="signup-remember-container">

                            <input type="checkbox" name="" id=""/>
                            I accept all Terms & Conditions

                        </div>
                        <div className="signup-btn-container">
                            <div className=""
                                onClick={onSubmittFunc}>
                                <Button name={"SignUp"}/>
                            </div>
                        </div>
                        <Link className="signup-footer" to="/login">Already have an Account
                            <span className="material-icons-round">
                                navigate_next
                            </span>
                        </Link>
                    </div>
                </main>
            </section>
        </div>
    </>)
}

export default SignupPage
