import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import './App.css';
import Homepage from "./pages/Homepage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

const App = () => {

  
      const token = Cookies.get("token");
    

  

  return (
    <>
    <div class="overlay-container"></div>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={token ? <Homepage /> : <Signin/>}
          />
          <Route
            path="/signin"
            element={token ? <Homepage/> : <Signin />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          {/* token ? <Navigate to="/" /> :  */}
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;
