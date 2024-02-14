import { useState, useRef, useEffect } from "react";
import "./signin.scss";
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
import HidePass from "../../assets/HidePass.png";
import showPassword from "../../assets/ShowPass.png";
import axios from "axios";
import { Toaster, toast } from "sonner";
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
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const navigate = useNavigate();
  const handleInputName = (e) => {
    const name = e.target.value;
    setIsNameTouched(true);
    if (name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setInputData({ ...inputData, name });
  };
  useEffect(() => {
    // Check email validity on component mount
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputData.email);
    setEmailError(!isValid);
  }, [inputData.email, isEmailTouched]);
  useEffect(() => {
    if (inputData.password && inputData.confirmPassword !== "") {
      inputData.password === inputData.confirmPassword
        ? setPasswordsMatch(true)
        : setPasswordsMatch(false);
    } else {
      setPasswordsMatch(false);
    }
  }, [inputData.password, inputData.confirmPassword]);
  const handleInputinputEmail = (e) => {
    const email = e.target.value;
    setInputData({ ...inputData, email });
    setIsEmailTouched(true);
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
    setLoading(true);
    if (inputData.password === inputData.confirmPassword) {
      try {
        setLoading(true);
        const user = await axios.post("https://esports-backend-v1gj.onrender.com/auth/signup", {
          username: inputData.email,
          password: inputData.password,
          name:inputData.name
        });
        if (user.status === 200) {
          toast.success('Signup Successful');
          setTimeout(()=>{
            setLoading(false);
            navigate("/signin");
          },1000)
          
          
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response);
        if(err.response.status===409){
          toast.error(err.response.data.message)
        }else{
          toast.error('server error')
        }
      }
    } else {
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
    <div className="signup-container">
      <Toaster richColors position="top-center"/>
      <div className="leftContainer">
        <img src={LeftSide} className="SigninImg" alt="name" />
      </div>
      <div className="right-container-signup">
        <div className="Logo-signin">
          <img src={Logo} className="logoHere" alt="name" />
          <span className="logo-name">wavechat</span>
        </div>
        <div className="Headinghere">Hello! Welcome Back!</div>

        <div className="inputs-div-signup">
          <label>
            Name{" "}
            {nameError && isNameTouched && (
              <span>*Name should be at least 3 letters</span>
            )}
          </label>
          <div className="inputs-div-here">
            <img src={NameIcon} className="ImgDIv" alt="name" />
            <input
              ref={inputRef}
              placeholder="| Enter your Name here"
              type="text"
              className="inputEmail"
              onChange={handleInputName}
            />
          </div>

          <label>
            Email
            {emailError && isEmailTouched && <span>*Enter a Valid Email</span>}
          </label>
          <div className="inputs-div-here">
            <img src={emailImg} className="ImgDIv" alt="name" />
            <input
              type="email"
              placeholder="| Enter your Email here"
              className="inputEmail"
              onChange={handleInputinputEmail}
            />
          </div>

          <label>Password</label>
          <div className="inputs-div-here">
            <img src={passwordImg} className="ImgDIv" alt="name" />
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
          <label>
            Confirm Password{" "}
            {inputData.password !== inputData.confirmPassword &&
              inputData.confirmPassword !== "" && (
                <span>*Password does not match</span>
              )}
          </label>
          <div className="inputs-div-here">
            <img src={passwordImg} className="ImgDIv" alt="name" />
            <input
              placeholder="| Confirm your here"
              type={showConfirmPass ? "text" : "password"}
              className="inputConfirmPassword"
              onChange={handleInputConfirmPassword}
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="buttonShow"
            >
              {showConfirmPass ? (
                <img src={showPassword} className="pass-icon" alt="signin" />
              ) : (
                <img src={HidePass} className="pass-icon" alt="signin" />
              )}
            </button>
          </div>

          <button
            className={`inputBtn ${
              emailError || nameError || !passwordsMatch ? "disabledButton" : ""
            }`}
            onClick={hanldeInputSubmit}
            disabled={loading || emailError || nameError || !passwordsMatch}
          >
            {loading ? <LoadingSpinner loading={loading} /> : "Signup"}
          </button>
        </div>
        <div className="or-block">-------------------or-------------------</div>
        <div className="Img-div">
          <img src={Insta} className="imgClick" alt="name" />
          <img src={Gmail} className="imgClick" alt="name" />
          <img src={Facebook} className="imgClick" alt="name" />
        </div>
        <div className="Dont-Sign-up">
          <span>Already Have a Account </span>
          <span className="Signup-forgot" onClick={handleSignup}>
            {" "}
            Sign in?
          </span>
        </div>
      </div>
      {error && (
        <div className="PopUpdiv">
          <div className="indisePopup">
            <div className="ErrorBlock">{errorMsg}</div>
            <button
              className="Close"
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
