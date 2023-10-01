import React, { useEffect, useState } from "react";
import styles from "./signin.module.css";
import app from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import LeftSide from "../../assets/SocialMedia.jpg";
import Insta from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Gmail from "../../assets/gmail.png";
import emailImg from "../../assets/emailImg.png";
import passwordImg from "../../assets/passwordImg.png";
const Signin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [token, setToken] = useState();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleInputinputEmail = (e) => {
    const email = e.target.value;
    setInputData({ ...inputData, email });
  };

  const handleInputPassword = (e) => {
    const password = e.target.value;
    setInputData({ ...inputData, password });
  };

  const hanldeInputSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      const user = userCredential.user;
      console.log("User signed in:", user, user.accessToken);
      if (user.accessToken) {
        Cookies.set("token", user.accessToken, { expires: 1 });
        navigate("/");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
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
              placeholder="|"
              className={styles["inputEmail"]}
              onChange={handleInputinputEmail}
            />
          </div>
          <label>Password</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} />
            <input
              placeholder="|"
              type="password"
              className={styles["inputPassword"]}
              onChange={handleInputPassword}
            />
          </div>
          <div className={styles['remember-me-div']}>
          <input type="checkbox"/>
          <label>Remember Me</label>
          </div>
          <button className={styles["inputBtn"]} onClick={hanldeInputSubmit}>
            Sign In
          </button>
        </div>
        <div className={styles["or-block"]}>-------------------or-------------------</div>
        <div className={styles["Img-div"]}>
          <img src={Insta} className={styles["imgClick"]} />
          <img src={Gmail} className={styles["imgClick"]} />
          <img src={Facebook} className={styles["imgClick"]} />
        </div>
        <div className={styles["Dont-Sign-up"]}>
          <span>Dont Have a Account</span>
          <span className={styles['Signup-forgot']}> Sign in?</span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
