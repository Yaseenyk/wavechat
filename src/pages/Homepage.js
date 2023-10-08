// Homepage.js

import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Sidebar from "../component/Sidebar/Sidebar";
import Chatbox from "../component/ChatView/ChatBox";

const Homepage = () => {

  return (
    <div className={styles.container}>
      <div className={styles["sidebar-container"]}>
        <Sidebar/>
      </div>
      <div className={styles["Main-Container"]}>
        
          <Chatbox/>
        
      </div>
    </div>
  );
};

export default Homepage;
