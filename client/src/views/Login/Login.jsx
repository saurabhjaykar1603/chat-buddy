import axios from "axios";
import React, { useState } from "react";
import showToast from "crunchy-toast";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignupUser = async () => {
    if (!email) {
      showToast("Email is required", "warning", 4000);
      return;
    }
    if (!password) {
      showToast("Password is required", "warning", 4000);
      return;
    }
  
    try {
      const response = await axios.post("/api/v1/logins", { email, password });
      if (response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        window.location.href = "/";
      } else {
        showToast(response?.data?.message || "An error occurred", "warning", 4000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast("Unauthorized: Invalid Credential", "warning", 4000);
      } else {
        console.log(error);
      }
    }
  };
  

  return (
    <div className="h-screen bg-slate-900 overflow-hidden  ">
      <form className="form mx-auto mt-36">
        <p className="form-title">Login in to your account</p>

        <div className="input-container">
          <input
            className="w-full"
            value={email}
            type="email"
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            className="w-full"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={SignupUser} type="button" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          Already have an account?
          <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
