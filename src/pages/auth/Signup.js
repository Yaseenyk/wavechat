import { useState, useRef, useEffect } from "react";
import styles from "./signin.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import LeftSide from "../../assets/SocialMedia.jpg";
import Insta from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Gmail from "../../assets/gmail.png";
import emailImg from "../../assets/emailImg.png";
import passwordImg from "../../assets/passwordImg.png";
import NameIcon from "../../assets/NameIcon.png";
import LoadingSpinner from "../../helpers/LoadingSpinner/LoadingSpinner";
const Signup = () => {
  const inputRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [error, SetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
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
  const handleInputProfilePhoto = (e) => {
    const image = e.target.files[0];
    setInputData({ ...inputData, image });
  };
  const hanldeInputSubmit = async () => {
    if (inputData.password === inputData.confirmPassword) {
      try {
        setLoading(true);
        const response = await createUserWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );
        if (response.status === 200) {
          navigate("/signin");
        }
      } catch (err) {
        const { code, message } = err;
        console.log(code, message);

        if (code == "auth/email-already-in-use") {
          setErrorMsg("You Have Already logged in go to signin page instead?");
        }
        SetError(true);
      }
    } else {
      alert("Password Doesnt Matches");
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleSignup = () => {
    navigate("/signin");
  };
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPass((prevState) => !prevState);
  };
  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setshowConfirmPass((prevState) => !prevState);
  };
  return (
    <div className={styles["signup-container"]}>
      <div className={styles["leftContainer"]}>
        <img src={LeftSide} className={styles["SigninImg"]} alt="name" />
      </div>
      <div className={styles["right-container-signup"]}>
        <div className={styles["Logo-signin"]}>
          <img src={Logo} className={styles["logoHere"]} alt="name" />
          <span className={styles["logo-name"]}>wavechat</span>
        </div>
        <div className={styles["Headinghere"]}>Hello! Welcome Back!</div>

        <div className={styles["inputs-div-signup"]}>
          <label>Name</label>
          <div className={styles["inputs-div-here"]}>
            <img src={NameIcon} className={styles["ImgDIv"]} alt="name" />
            <input
              ref={inputRef}
              type="text"
              className={styles["inputEmail"]}
              onChange={handleInputName}
            />
          </div>

          <label>Email</label>
          <div className={styles["inputs-div-here"]}>
            <img src={emailImg} className={styles["ImgDIv"]} alt="name" />
            <input
              type="email"
              className={styles["inputEmail"]}
              onChange={handleInputinputEmail}
            />
          </div>

          <label>Password</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} alt="name" />
            <input
              type={showPass ? "text" : "password"}
              className={styles["inputPassword"]}
              onChange={handleInputPassword}
            />
            <button
              type="button"
              className={styles["buttonShow"]}
              onClick={toggleShowPassword}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          <label>Confirm Password</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} alt="name" />
            <input
              type={showPass ? "text" : "password"}
              className={styles["inputConfirmPassword"]}
              onChange={handleInputConfirmPassword}
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className={styles["buttonShow"]}
            >
              {showConfirmPass ? "Hide" : "Show"}
            </button>
          </div>

          <button
            className={styles["inputBtn"]}
            onClick={hanldeInputSubmit}
            disabled={loading}
          >
            {loading ? <LoadingSpinner loading={loading} /> : "Signup"}
          </button>
        </div>
        <div className={styles["or-block"]}>
          -------------------or-------------------
        </div>
        <div className={styles["Img-div"]}>
          <img src={Insta} className={styles["imgClick"]} alt="name" />
          <img src={Gmail} className={styles["imgClick"]} alt="name" />
          <img src={Facebook} className={styles["imgClick"]} alt="name" />
        </div>
        <div className={styles["Dont-Sign-up"]}>
          <span>Already Have a Account </span>
          <span className={styles["Signup-forgot"]} onClick={handleSignup}>
            {" "}
            Sign in?
          </span>
        </div>
      </div>
      {error && (
        <div className={styles["PopUpdiv"]}>
          <div className={styles["indisePopup"]}>
            <div className={styles["ErrorBlock"]}>{errorMsg}</div>
            <button
              className={styles["Close"]}
              onClick={(e) => {
                SetError(false);
                setLoading(false);
              }}
              // onClick={e=>SetError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
