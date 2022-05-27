import axios from 'axios';
import React, {useReducer, useState} from 'react';
import { useNavigate } from 'react-router';
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
import { IMAGES } from '../../assets';

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
    const navigate = useNavigate();
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

    const onSubmitHandler = async (e) => {
        e.preventDefault();
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
        <div className='signup-main-container font-family'>
            <section className='auth-sidebar'>
                <div className='auth-sidebar-content'>
                    <div className='header'> 
                        <div className='title-name page-title'>
                            <p className='xxlg-txt fn-wg-700 ' onClick={()=>navigate("/")}>Fleets</p>
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
                    <form className="signup-container text-align" onSubmit={onSubmitHandler}>
                        <img src={IMAGES.logoPNG}/>
                        <div className='stretch'>
                            <input placeholder="Email Address - xyz@gmail.com" className="signup-credential-container fn-wg-600" required
                                onChange={
                                    (e) => dispatch({email: e.target.value})
                                }/>
                            <div className='password-holder'>
                                <input type={passwordType} className="signup-credential-container fn-wg-600"
                                    style={{  borderColor: passwordCheckError,
                                            outlineColor: passwordCheckError }}
                                    onChange={(e) => {PasswordCheck(e.target.value); }}
                                    name="" placeholder="Password" id="" />
                                {   passwordType === "password" ?
                                        <span className="material-icons-round" onClick={()=>PasswordVisibilityHandler() }>
                                            visibility</span>
                                        : <span className="material-icons-round" onClick={() => PasswordVisibilityHandler()}>
                                            visibility_off</span>}
                            </div>
                                
                            <p className='error'>
                                {CheckMinimalCharInPassword()}
                            </p>
                            <p className='error'>
                                {VerifyPasswordChar()}
                            </p>
                            <input type="password" placeholder="Confirm Password" name="" id="" className="signup-credential-container fn-wg-600"
                                style={{ borderColor: passwordCheckError,
                                        outlineColor: passwordCheckError,
                                        cursor :  passwordCheckError && confirmPassword.length >= 7 ?"pointer" : "not-allowed"  }}
                                onChange={(e) => {setPasswordCheckError(e.target.value !== confirmPassword ? "red" : "black");}}
                                disabled={ passwordCheckError && confirmPassword.length >= 7 ? false : true   }/>
                            
                            <p className='error'>
                                {passwordCheckError === "red" && "Confirm Password Should match Password"}
                            </p>

                            <input type="email" placeholder="First Name" className="signup-credential-container fn-wg-600"
                                onChange={ (e) => dispatch({firstName: e.target.value})} required/>
                            
                            <input type="email" placeholder="Last Name" className="signup-credential-container fn-wg-600"
                                onChange={(e) => dispatch({lastName: e.target.value})} required/>
                        </div>
                        <div className="signup-remember-container white-txt">

                            <input type="checkbox" name="" id=""/>
                            I accept all Terms & Conditions

                            </div>
                            <button type="submit" className="action-btn">Sign Up</button>
                        
                            <p className="signup-footer lg-txt cta-txt underline fn-wg-700" onClick={() => navigate("/login")}>
                                Already have an Account
                            <span className="material-icons-round">
                                navigate_next
                            </span>
                        </p>
                    </form>
                </main>
            </section>
        </div>
    </>)
}

export default SignupPage
