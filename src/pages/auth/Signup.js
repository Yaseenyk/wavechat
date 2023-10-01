import React, { useState } from "react";
import styles from "./signin.module.css";
import app from '../../config/firebase';
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";
const Signup = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={styles["signup-container"]}>
      <input
        type="text"
        className={styles["inputName"]}
        onChange={handleInputName}
        placeholder="Enter You're Name"
      />
      <input
        type="email"
        className={styles["inputEmail"]}
        onChange={handleInputinputEmail}
        placeholder="Enter You're Email"
      />
      <input
        type="password"
        className={styles["inputPassword"]}
        onChange={handleInputPassword}
        placeholder="Enter Your Password"
      />

      <input
        type="password"
        className={styles["inputConfirmPassword"]}
        onChange={handleInputConfirmPassword}
        placeholder="Confirm Your Password"
      />
      <button className={styles["inputBtn"]} onClick={hanldeInputSubmit}>
        SignUp
      </button>
    </div>
  );
};

export default Signup;
