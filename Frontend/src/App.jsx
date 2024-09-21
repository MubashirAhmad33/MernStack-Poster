import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="bg-[#3730a3] ">
      <div className="max-w-screen-lg mx-auto">
        <div>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />

              <Route path="/signup" element={<SignupPage />} />
              {/* Add other routes here as needed */}
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
