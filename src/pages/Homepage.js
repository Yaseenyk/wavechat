// Homepage.js

import React from "react";
import styles from "./Homepage.scss";
import { Toaster } from "sonner";
const Homepage = () => {
  return (
    <div className={styles.container}>
      <Toaster richColors position="top-center"/>
    </div>
  );
};

export default Homepage;
