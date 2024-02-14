import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useMemo } from "react";
import "./App.css";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Signin = lazy(() => import("./pages/auth/Signin"));
const Signup = lazy(() => import("./pages/auth/Signup"));


const ProtectedRoute = ({ element }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const hasTokens = accessToken && refreshToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasTokens) {
      // Redirect to /signin if tokens are not present
      navigate("/signin");
    }
  }, [hasTokens, navigate]);

  return hasTokens ? element : null;
};

const App = () => {
  const signinElement = useMemo(() => <Signin />, []);
  const signupElement = useMemo(() => <Signup />, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<Homepage/>} />}
          />
          <Route path="/signin" element={signinElement} />
          <Route path="/signup" element={signupElement} />
          <Route path="/idcard" element />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
