import React, { useEffect, useState } from "react";
import styles from "./JusForFun.module.css";
import Logo from "../../assets/Logo.png";
import Insta from "../../assets/instagram.png";
import Gmail from "../../assets/emailImg.png";
import Facebook from "../../assets/facebook.png";
const JusForFun = () => {
  const[facts,setFacts]=useState('');
  useEffect(() => {
      const apiKey = "t0tiqdiXXE/22zIiW+dlrA==IYhOYNHs308H6oFL"; // Replace with your actual API key
      const apiUrl = "https://api.api-ninjas.com/v1/facts?limit=1";

      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              'X-Api-Key': apiKey,
              Accept: 'image/jpeg', // Specify the desired content type here
            },
          });
          const data = await response.json();
          console.log()
          setFacts(data[0].fact)
        } catch (error) {
          console.error("An error occurred while fetching data:", error);
        }
      };

      fetchData(); 
    }, []);
  return (
    <div className={styles["main-container"]}>
      <div className={styles["images-container"]}>
        <div className={styles["image-circle"]}>
          <img src={Logo} />
          <span>Wavechat</span>
        </div>
      </div>
      <div className={styles["socio-main"]}>
        <span>Our Social Media!</span>
        <div className={styles["socio-icons"]}>
          <img src={Facebook} />
          <img src={Insta} />
          <img src={Gmail} />
        </div>
      </div>
      <div className={styles["facts"]}>
        <div className={styles["facts-heading"]}>
          <span>Bored? <br/>Here is a Random Fact For You!</span>
          <div className={styles["factHere"]}>
          {facts}!
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default JusForFun;
