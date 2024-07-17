import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ showRoleField = false }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(showRoleField);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignupMode) {
        // Signup mode
        await signup(username, password, role);
        toast.success("Successfully signed up. Now you can login.");
        setIsSignupMode(false);
      } else {
        // Login mode
        const response = await login(username, password);
        const { token } = response;
        localStorage.setItem("token", token);
        toast.success("Successfully logged in.");
        navigate("/employee-list");
      }
    } catch (error) {
      console.error(isSignupMode ? "Signup failed:" : "Login failed:", error);
      toast.error(isSignupMode ? "Signup failed. Please try again." : "Login failed. Please check your credentials.");
    }
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    setRole("");
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Employees</h2>
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="form-label-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            type="text"
            id="inputUsername"
            className="form-control"
            placeholder="User Name"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-label-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignupMode && (
          <div className="form-label-group">
            <label htmlFor="inputRole">Role</label>
            <input
              type="text"
              id="inputRole"
              className="form-control"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        )}
        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          {isSignupMode ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="mt-3">
        {isSignupMode
          ? "Already have an account? "
          : "Don't have an account? "}
          <a href="#" onClick={toggleMode}>
          {isSignupMode ? "Login" : "Sign Up"}
        </a>
      </p>
    </div>
  );
};

export default Login;
