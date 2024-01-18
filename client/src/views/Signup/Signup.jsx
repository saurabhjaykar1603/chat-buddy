import axios from "axios";
import React, { useState } from "react";
import showToast from "crunchy-toast";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignupUser = async () => {
    if (!userName) {
      showToast("User name is required", "warning", 4000);
      return;
    }
    if (!email) {
      showToast("Email is required", "warning", 4000);
      return;
    }
    if (!password) {
      showToast("Password is required", "warning", 4000);
      return;
    }

    try {
      const res = await axios.post("/api/v1/signups", {
        userName,
        email,
        password,
      });

      if (res.data.message === "Name already exists") {
        return showToast("User name already exists", "error", 4000);
      }
      if (res.data.message === "Email already Exits") {
        return showToast("Email already exists", "error", 4000);
      }

      if (res.data.success) {
        alert(res.data.message);
        window.location.href = "/login";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      showToast("username & email already exist", "error", 4000);
    }
  };

  return (
    <div className="h-screen bg-slate-900 overflow-hidden  ">
      <form className="form mx-auto mt-36">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container ">
          <input
            className="w-full"
            value={userName}
            type="text"
            placeholder="enter user name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <span></span>
        </div>
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
          Already have an account ? <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
