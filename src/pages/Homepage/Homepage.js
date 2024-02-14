// Homepage.js

import React from "react";
import "./Homepage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Maincomponent from "../../components/MainComponent/Maincomponent";
const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar/>
      <Maincomponent/>
    </div>
  );
};

export default Homepage;
