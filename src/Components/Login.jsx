import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Login.css";
import api from "../axiosConfig";

function Login() {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post("/users/login", {
        email: formData.email,
        password: formData.password
      });

      console.log("Login Response:", response.data);

      localStorage.setItem(
        "userData",
        JSON.stringify(response.data)
      );

      navigate("/CustomerDashboard");

    } catch (error) {

      console.error("Login Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
          "Invalid Email or Password"
        );
      } else {
        alert("Unable to connect to server");
      }

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className={`login-page ${show ? "show-page" : ""}`}>

      {/* LEFT SECTION */}

      <div className="login-brand-section">

        <div className="brand-content">

          <div className="brand-logo">
            <i className="bi bi-people-fill"></i>
          </div>

          <h1>
            Int<span>Buddy</span>
          </h1>

          <p className="brand-tagline">
            Your Interview Experience Community
          </p>

          <div className="brand-line"></div>

          <div className="brand-features">

            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-chat-square-text-fill"></i>
              </div>

              <div>
                <h6>Share Experiences</h6>
                <p>Share your real interview journey</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-lightbulb-fill"></i>
              </div>

              <div>
                <h6>Learn From Others</h6>
                <p>Prepare smarter with real experiences</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="bi bi-rocket-takeoff-fill"></i>
              </div>

              <div>
                <h6>Grow Your Career</h6>
                <p>Build confidence for your next interview</p>
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT LOGIN SECTION */}

      <div className="login-form-section">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="mobile-logo">
              <i className="bi bi-people-fill"></i>
            </div>

            <h3>
              Int<span>Buddy</span>
            </h3>
          </div>

          <div className="login-heading">

            <span className="welcome-badge">
              Welcome Back
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Continue your interview preparation journey.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="login-input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <i className="bi bi-envelope"></i>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-input-group">

              <div className="password-label">

                <label>Password</label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>

              <div className="input-wrapper">

                <i className="bi bi-lock"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <i
                    className={
                      showPassword
                        ? "bi bi-eye-slash"
                        : "bi bi-eye"
                    }
                  ></i>
                </button>

              </div>

            </div>


            {/* REMEMBER */}

            <div className="remember-row">

              <label className="remember-check">

                <input type="checkbox" />

                <span></span>

                Remember me

              </label>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}

            </button>

          </form>


          {/* REGISTER */}

          <div className="register-section">

            <span>Don't have an account?</span>

            <button
              onClick={() => navigate("/Registration")}
            >
              Create Account
            </button>

          </div>


          {/* SECURITY */}

          <div className="security-note">

            <i className="bi bi-shield-check"></i>

            <span>
              Your account information is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;