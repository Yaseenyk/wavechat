import React, { useState } from "react";
import styles from "./signin.module.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import LeftSide from "../../assets/SocialMedia.jpg";
import Insta from "../../assets/instagram.png";
import Facebook from "../../assets/facebook.png";
import Gmail from "../../assets/gmail.png";
import emailImg from "../../assets/emailImg.png";
import passwordImg from "../../assets/passwordImg.png";
import { db, storage } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadingSpinner from "../../helpers/LoadingSpinner/LoadingSpinner";
const Signup = () => {
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
  // setLoading(true);
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

        const storageRef = ref(storage, `${inputData.name}_profile`);
        const uploadTask = uploadBytesResumable(storageRef, inputData.image);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            SetError(true);
            setErrorMsg("Error uploading image.");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log(downloadURL);
                await updateProfile(response.user, {
                  displayName: inputData.name,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", response.user.uid), {
                  uid: response.user.uid,
                  name: inputData.name,
                  email: inputData.email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", response.user.uid), {});
                setLoading(false);
                navigate("/signin");
              }
            );
          }
        );
      } catch (err) {
        console.log(err.message);
        SetError(true);
        setErrorMsg(err.message);
        
        // if(err.message == 'Firebase: Error (auth/email-already-in-use)'){
        //   setErrorMsg('Email Already')
        // }
      }
    }
  };

  const handleSignup = () => {
    navigate("/signin");
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["leftContainer"]}>
        <img src={LeftSide} className={styles["SigninImg"]} />
      </div>
      <div className={styles["right-container-signup"]}>
        <div className={styles["Logo-signin"]}>
          <img src={Logo} className={styles["logoHere"]} />
          <span className={styles["logo-name"]}>wavechat</span>
        </div>
        <div className={styles["Headinghere"]}>Hello! Welcome Back!</div>

        <div className={styles["inputs-div-signup"]}>
          <label>Name</label>
          <div className={styles["inputs-div-here"]}>
            <img src={emailImg} className={styles["ImgDIv"]} />
            <input
              type="text"
              className={styles["inputEmail"]}
              onChange={handleInputName}
            />
          </div>

          <label>Email</label>
          <div className={styles["inputs-div-here"]}>
            <img src={emailImg} className={styles["ImgDIv"]} />
            <input
              type="email"
              className={styles["inputEmail"]}
              onChange={handleInputinputEmail}
            />
          </div>

          <label>Password</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} />
            <input
              type="password"
              className={styles["inputPassword"]}
              onChange={handleInputPassword}
            />
          </div>
          <label>Confirm Password</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} />
            <input
              type="password"
              className={styles["inputConfirmPassword"]}
              onChange={handleInputConfirmPassword}
            />
          </div>
          <label>Add Profile Photo</label>
          <div className={styles["inputs-div-here"]}>
            <img src={passwordImg} className={styles["ImgDIv"]} />
            <input
              type="file"
              className={styles["inputFile"]}
              onChange={handleInputProfilePhoto} // Use handleInputProfilePhoto for file input
              accept="image/*"
            />
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
          <img src={Insta} className={styles["imgClick"]} />
          <img src={Gmail} className={styles["imgClick"]} />
          <img src={Facebook} className={styles["imgClick"]} />
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
              onClick={(e) => {SetError(false); setLoading(false);}}
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
