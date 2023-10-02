import React, { useState } from "react";
import styles from "./signin.module.css";
import app from "../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import LeftSide from "../../assets/SocialMedia.jpg";
import Insta from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Gmail from "../../assets/gmail.png";
import emailImg from "../../assets/emailImg.png";
import passwordImg from "../../assets/passwordImg.png";
const Signup = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate()
  const auth = getAuth();
  const handleInputName = (e) => {
    const name = e.target.value;
    setInputData({ ...inputData, name });
  };
  const handleInputinputEmail = (e) => {
    const email = e.target.value;
    setInputData({ ...inputData, email });
  };
  const handleInputPassword = (e) => {
    const password = e.target.value;
    setInputData({ ...inputData, password });
  };
  const handleInputConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setInputData({ ...inputData, confirmPassword });
  };
  const hanldeInputSubmit = async () => {
    if (inputData.password === inputData.confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );
        console.log(response.user.accessToken)
        if(response.user.accessToken){
          navigate('/signin')
        }
      
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSignup = ()=>{
    navigate('/signin')
  }
  return (
    <div className={styles["signin-container"]}>
      <div className={styles["leftContainer"]}>
        <img src={LeftSide} className={styles["SigninImg"]} />
      </div>
      <div className={styles["right-container"]}>
      <div className={styles["Logo-signin"]}>
           <img src={Logo} className={styles["logoHere"]} />
           <span className={styles["logo-name"]}>wavechat</span>
         </div>
         <div className={styles["Headinghere"]}>Hello! Welcome Back!</div>
         <div className={styles["inputs-div"]}>
         <label>Email</label>
           <div className={styles["inputs-div-here"]}>
             <img src={emailImg} className={styles["ImgDIv"]} />
        <input
          type="email"
          className={styles["inputEmail"]}
          onChange={handleInputinputEmail}
          placeholder="Enter You're Email"
        />
        </div>
        <label>Password</label>
        <div className={styles["inputs-div-here"]}>
        <img src={passwordImg} className={styles["ImgDIv"]} />
        <input
          type="password"
          className={styles["inputPassword"]}
          onChange={handleInputPassword}
          placeholder="Enter Your Password"
        />
        </div>
        <label>Password</label>
           <div className={styles["inputs-div-here"]}>
             <img src={passwordImg} className={styles["ImgDIv"]} />
        <input
          type="password"
          className={styles["inputConfirmPassword"]}
          onChange={handleInputConfirmPassword}
          placeholder="Confirm Your Password"
        />
        </div>
        <button className={styles["inputBtn"]} onClick={hanldeInputSubmit}>
          SignUp
        </button>
        </div>
        <div className={styles["or-block"]}>-------------------or-------------------</div>
         <div className={styles["Img-div"]}>
           <img src={Insta} className={styles["imgClick"]} />
           <img src={Gmail} className={styles["imgClick"]} />
           <img src={Facebook} className={styles["imgClick"]} />
         </div>
         <div className={styles["Dont-Sign-up"]}>
           <span>Already
             Have a Account </span>
           <span className={styles['Signup-forgot']} onClick={handleSignup}>  Sign in?</span>
         </div>
      </div>
    </div>
  );
};

export default Signup;

