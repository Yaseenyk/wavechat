import React, { useState, useRef, useEffect } from "react";
import "./signin.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import LeftSide from "../../assets/SocialMedia.jpg";
import Insta from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Gmail from "../../assets/gmail.png";
import emailImg from "../../assets/emailImg.png";
import passwordImg from "../../assets/passwordImg.png";
import LoadingSpinner from "../../helpers/LoadingSpinner/LoadingSpinner";
import HidePass from "../../assets/HidePass.png";
import showPassword from "../../assets/ShowPass.png";
import { Toaster, toast } from "sonner";
import axios from "axios";
const Signin = () => {
  const focusRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setemailError] = useState(true);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  useEffect(() => {
    // Check email validity on component mount
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputData.email);
    setemailError(!isValid);
  }, [inputData.email, isInputTouched]);

  useEffect(() => {
    focusRef.current.focus();
  }, []);
  const handleInputinputEmail = (e) => {
    const email = e.target.value;
    setInputData({ ...inputData, email });
    setIsInputTouched(true);
  };

  const handleInputPassword = (e) => {
    const password = e.target.value;
    if (password) {
      setPasswordsMatch(false);
    }
    setInputData({ ...inputData, password });
  };

  const hanldeInputSubmit = async () => {
    try {
      setLoading(true);

      const user = await axios.post("https://esports-backend-v1gj.onrender.com/auth/login", {
        username: inputData.email,
        password: inputData.password,
      });
      if (user) {
        toast.success(user.data.message);
        const accessToken = user.data.accessToken;
        const refreshToken = user.data.refreshToken;
        setSessionToken(accessToken, refreshToken);
        setTimeout(()=>{
          if (accessToken && refreshToken && user) {
            navigate("/");
          }
          setLoading(false);
        },1000)
        
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.isAxiosError) {
        if (error.response?.data?.status ===401) {
          toast.error(error.response?.data?.message);
        } else if (error.code === 'ERR_NETWORK') {
          toast.error('Failed to connect to the server.');
        }else {
          toast.error("Login Failed. Please try again.");
        }
      }
    }
  };
  const setSessionToken = (accessToken, refreshToken) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  };
  const handleSignin = () => {
    navigate("/signup");
  };
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPass((prevState) => !prevState);
  };
  return (
    <div className="signin-container">
      <Toaster richColors position="top-center" />
      <div className="leftContainer">
        <img src={LeftSide} className="SigninImg" alt="signin" />
      </div>
      <div className="right-container">
        <div className="Logo-signin">
          <img src={Logo} className="logoHere" alt="signin" />
          <span className="logo-name">wavechat</span>
        </div>
        <div className="Headinghere">Hello! Welcome Back!</div>
        <div className="inputs-div">
          <label>
            Email {emailError && isInputTouched && <span>*Invalid Email</span>}
          </label>
          <div className="inputs-div-here">
            <img src={emailImg} className="ImgDIv" alt="signin" />
            <input
              ref={focusRef}
              type="email"
              placeholder="| Enter your Email here"
              className="inputEmail"
              onChange={handleInputinputEmail}
            />
          </div>
          <label>Password</label>
          <div className="inputs-div-here">
            <img src={passwordImg} className="ImgDIv" alt="signin" />
            <input
              placeholder="| Enter your Password here"
              type={showPass ? "text" : "password"}
              className="inputPassword"
              onChange={handleInputPassword}
            />
            <button
              type="button"
              className="buttonShow"
              onClick={toggleShowPassword}
            >
              {showPass ? (
                <img src={showPassword} className="pass-icon" alt="signin" />
              ) : (
                <img src={HidePass} className="pass-icon" alt="signin" />
              )}
            </button>
          </div>
          <div className="remember-me-div">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
          <button
            className={`inputBtn ${
              emailError || passwordsMatch ? "disabledButton" : ""
            }`}
            onClick={hanldeInputSubmit}
            disabled={loading || emailError || passwordsMatch}
          >
            {loading ? <LoadingSpinner loading={loading} /> : "Login"}
          </button>
        </div>
        {/* <hr/> */}
        <div className="or-block">-------------------or-------------------</div>
        <div className="Img-div">
          <img src={Insta} className="imgClick" alt="signin" />
          <img src={Gmail} className="imgClick" alt="signin" />
          <img src={Facebook} className="imgClick" alt="signin" />
        </div>
        <div className="Dont-Sign-up">
          <span>Dont Have a Account</span>
          <span className="Signup-forgot" onClick={handleSignin}>
            {" "}
            Sign up?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
