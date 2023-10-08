import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "./Loading.module.css"; // You can define your own styles

const LoadingSpinner = ({ loading }) => {
  const customStyles = buildStyles({
    pathColor: 'white', 
    textColor: 'white',
  });

  return (
    loading && (
      <div className={styles["loading-container"]}>
        <CircularProgressbar value={100} text="" styles={customStyles} />
      </div>
    )
  );
};

export default LoadingSpinner;
