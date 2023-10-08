import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import Homepage from "./pages/Homepage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  // const[token,setToken]=useState();
  //     useEffect(()=>{
  //       const token = localStorage.getItem("user");
  //       setToken(token)
  //     });

  const { currentUser } = useContext(AuthContext);

  const ProtectetdRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <>
      <div className="overlay-container"></div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              index
              element={
                <ProtectetdRoute>
                  <Homepage />
                </ProtectetdRoute>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            {/* token ? <Navigate to="/" /> :  */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
