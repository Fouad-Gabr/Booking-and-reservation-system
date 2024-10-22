import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password, acceptTerms });
  };

  return (
    <div className="container-fluid h-sm-auto signup-page d-flex align-items-center justify-content-center p-0">
      <div className="row w-100">
        <div className="col-md-6 d-flex h-sm-auto align-items-center justify-content-center right-section p-2">
          <div className="card form-card-parent h-sm-auto px-4 pt-3 pb-1 shadow-lg border-0">
            <h2 className="text-center mb-3 form-title">
              Sign Up for EasyReserve™
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-signup"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-signup"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Your Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control form-control-signup"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control form-control-signup"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
                <label className="form-check-label" htmlFor="acceptTerms">
                  I accept the terms and conditions
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-3 already-word">
                Already have an account?{" "}
                <Link to="/login" className="login-word">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center left-section">
          <div className="text-center text-white">
            <h1 className="fs-1 website-name">EasyReserve™</h1>
            <p className="text-white-50">Your Path to Recovery Starts Here</p>
            <p>Join us to access personalized physical therapy services.</p>
            <button className="btn btn-outline-light m-2">Learn More</button>
            <button className="btn btn-outline-light m-2">Our Services</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
