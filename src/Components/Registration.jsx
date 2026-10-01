import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    state: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      if (name === "email" && value.length > 0) {
        const res = await api.get(
          `/users/check-email?email=${encodeURIComponent(value)}`
        );

        if (res.data) {
          setMessage("Email already registered");
        } else {
          setMessage("");
        }
      }

      if (name === "phoneno" && value.length === 10) {
        const res = await api.get(
          `/users/check-phone?phoneno=${encodeURIComponent(value)}`
        );

        if (res.data) {
          setMessage("Phone number already registered");
        } else {
          setMessage("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SEND OTP
  // =========================
  const sendOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter email");
      return;
    }

    try {
      setLoading(true);

      // Duplicate email check
      const check = await api.get(
        `/users/check-email?email=${encodeURIComponent(formData.email)}`
      );

      if (check.data) {
        setMessage("Email already registered");
        return;
      }

      // Send OTP
      const response = await api.post(
        `/users/sendotp/${encodeURIComponent(formData.email)}`
      );

      console.log(response.data);

      setOtpSent(true);
      setMessage("OTP sent successfully to your email.");
    } catch (error) {
      console.log(error);
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/users/verifyotp/${otp}`);

      if (response.data === true) {
        setOtpVerified(true);
        setMessage("OTP verified successfully.");
      } else {
        setMessage("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      setMessage("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER USER
  // =========================
  const registerUser = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setMessage("Please verify OTP first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneno: formData.phoneno,
        password: formData.password,
        gender: formData.gender,
        country: formData.country,
        state: formData.state,
      };

      const response = await api.post("/users/register", userData);

      console.log(response.data);

      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneno: formData.phoneno,
        })
      );

      setMessage("Registration successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          error.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="container-fluid registration-page"
  style={{
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "80px 0 30px 0",
    boxSizing: "border-box",
  }}
>
     <div
  className="row g-0"
  style={{
    minHeight: "calc(100vh - 110px)",
  }}
>
        {/* ==================================================
            LEFT SIDE - BRANDING
        ================================================== */}
        <div
          className="col-lg-6 d-none d-lg-flex"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,193,7,0.22), transparent 35%), #17191f",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "330px",
              height: "330px",
              border: "1px solid rgba(255,193,7,0.15)",
              borderRadius: "50%",
              top: "-130px",
              right: "-80px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "260px",
              height: "260px",
              border: "1px solid rgba(255,193,7,0.12)",
              borderRadius: "50%",
              bottom: "-100px",
              left: "-130px",
            }}
          />

          <div
            className="d-flex flex-column justify-content-center"
            style={{
              width: "100%",
              padding: "70px 12%",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Icon */}
            <div
              className="d-flex align-items-center justify-content-center mb-4"
              onMouseEnter={() => setHoveredWord("icon")}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                width: "62px",
                height: "62px",
                background: "#ffbf00",
                borderRadius: "16px",
                color: "#17191f",
                fontSize: "28px",
                cursor: "default",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                transform:
                  hoveredWord === "icon"
                    ? "translateY(-6px) rotate(-3deg) scale(1.05)"
                    : "translateY(0) rotate(0) scale(1)",
                boxShadow:
                  hoveredWord === "icon"
                    ? "0 14px 30px rgba(255,191,0,0.28)"
                    : "none",
              }}
            >
              <i className="bi bi-person-plus-fill"></i>
            </div>

            {/* Heading */}
            <h1
              className="fw-bold mb-2"
              onMouseEnter={() => setHoveredWord("join")}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                fontSize: "52px",
                letterSpacing: "-2px",
                cursor: "default",
                transition: "transform 0.35s ease, letter-spacing 0.35s ease",
                transform:
                  hoveredWord === "join"
                    ? "translateX(5px) translateY(-2px)"
                    : "translateX(0) translateY(0)",
              }}
            >
              Join{" "}
              <span
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredWord("intbuddy");
                }}
                onMouseLeave={() => setHoveredWord(null)}
                style={{
                  display: "inline-block",
                  color: "#ffbf00",
                  cursor: "default",
                  transition:
                    "transform 0.4s ease, letter-spacing 0.4s ease, text-shadow 0.4s ease",
                  transform:
                    hoveredWord === "intbuddy"
                      ? "translateX(7px) translateY(-4px) scale(1.03)"
                      : "translateX(0) translateY(0) scale(1)",
                  letterSpacing: hoveredWord === "intbuddy" ? "1px" : "0",
                  textShadow:
                    hoveredWord === "intbuddy"
                      ? "0 8px 25px rgba(255,193,7,0.35)"
                      : "none",
                }}
              >
                IntBuddy
              </span>
            </h1>

            <p
              onMouseEnter={() => setHoveredWord("intro")}
              onMouseLeave={() => setHoveredWord(null)}
              style={{
                color: hoveredWord === "intro" ? "#e4e5e9" : "#c5c7ce",
                fontSize: "18px",
                marginBottom: "28px",
                cursor: "default",
                display: "inline-block",
                transition: "transform 0.35s ease, color 0.35s ease",
                transform:
                  hoveredWord === "intro"
                    ? "translateX(6px) translateY(-2px)"
                    : "translateX(0) translateY(0)",
              }}
            >
              Build your profile and become part of our interview
              experience community.
            </p>

            {/* Yellow line */}
            <div
              style={{
                width: "55px",
                height: "4px",
                background: "#ffbf00",
                borderRadius: "10px",
                marginBottom: "35px",
              }}
            />

            {/* Feature 1 */}
            <div
              className="d-flex align-items-start mb-4"
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                cursor: "default",
                transform:
                  hoveredFeature === 1
                    ? "translateX(8px) translateY(-2px)"
                    : "translateX(0) translateY(0)",
                transition: "transform 0.35s ease",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  background:
                    hoveredFeature === 1
                      ? "rgba(255,191,0,0.22)"
                      : "rgba(255,191,0,0.12)",
                  borderRadius: "12px",
                  color: "#ffbf00",
                  transition:
                    "transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
                  transform:
                    hoveredFeature === 1
                      ? "translateY(-4px) rotate(-4deg) scale(1.08)"
                      : "translateY(0) rotate(0) scale(1)",
                  boxShadow:
                    hoveredFeature === 1
                      ? "0 8px 22px rgba(255,191,0,0.18)"
                      : "none",
                }}
              >
                <i className="bi bi-chat-left-text-fill"></i>
              </div>

              <div
                style={{
                  transition: "transform 0.35s ease",
                  transform:
                    hoveredFeature === 1
                      ? "translateX(3px)"
                      : "translateX(0)",
                }}
              >
                <h6
                  className="fw-bold mb-1"
                  style={{
                    color: hoveredFeature === 1 ? "#ffbf00" : "#fff",
                    transition: "color 0.35s ease",
                  }}
                >
                  Share Experiences
                </h6>
                <small style={{ color: "#9ea2ad" }}>
                  Share your real interview journey with others.
                </small>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="d-flex align-items-start mb-4"
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                cursor: "default",
                transform:
                  hoveredFeature === 2
                    ? "translateX(8px) translateY(-2px)"
                    : "translateX(0) translateY(0)",
                transition: "transform 0.35s ease",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  background:
                    hoveredFeature === 2
                      ? "rgba(255,191,0,0.22)"
                      : "rgba(255,191,0,0.12)",
                  borderRadius: "12px",
                  color: "#ffbf00",
                  transition:
                    "transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
                  transform:
                    hoveredFeature === 2
                      ? "translateY(-4px) rotate(4deg) scale(1.08)"
                      : "translateY(0) rotate(0) scale(1)",
                  boxShadow:
                    hoveredFeature === 2
                      ? "0 8px 22px rgba(255,191,0,0.18)"
                      : "none",
                }}
              >
                <i className="bi bi-lightbulb-fill"></i>
              </div>

              <div
                style={{
                  transition: "transform 0.35s ease",
                  transform:
                    hoveredFeature === 2
                      ? "translateX(3px)"
                      : "translateX(0)",
                }}
              >
                <h6
                  className="fw-bold mb-1"
                  style={{
                    color: hoveredFeature === 2 ? "#ffbf00" : "#fff",
                    transition: "color 0.35s ease",
                  }}
                >
                  Learn From Others
                </h6>
                <small style={{ color: "#9ea2ad" }}>
                  Prepare smarter using real interview experiences.
                </small>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="d-flex align-items-start"
              onMouseEnter={() => setHoveredFeature(3)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                cursor: "default",
                transform:
                  hoveredFeature === 3
                    ? "translateX(8px) translateY(-2px)"
                    : "translateX(0) translateY(0)",
                transition: "transform 0.35s ease",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  background:
                    hoveredFeature === 3
                      ? "rgba(255,191,0,0.22)"
                      : "rgba(255,191,0,0.12)",
                  borderRadius: "12px",
                  color: "#ffbf00",
                  transition:
                    "transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
                  transform:
                    hoveredFeature === 3
                      ? "translateY(-4px) rotate(-4deg) scale(1.08)"
                      : "translateY(0) rotate(0) scale(1)",
                  boxShadow:
                    hoveredFeature === 3
                      ? "0 8px 22px rgba(255,191,0,0.18)"
                      : "none",
                }}
              >
                <i className="bi bi-rocket-takeoff-fill"></i>
              </div>

              <div
                style={{
                  transition: "transform 0.35s ease",
                  transform:
                    hoveredFeature === 3
                      ? "translateX(3px)"
                      : "translateX(0)",
                }}
              >
                <h6
                  className="fw-bold mb-1"
                  style={{
                    color: hoveredFeature === 3 ? "#ffbf00" : "#fff",
                    transition: "color 0.35s ease",
                  }}
                >
                  Grow Your Career
                </h6>
                <small style={{ color: "#9ea2ad" }}>
                  Build confidence for your next interview.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT SIDE - REGISTRATION FORM
        ================================================== */}
       
        <div
  className="col-lg-6 d-flex justify-content-center"
  style={{
    alignItems: "flex-start",
    padding: "35px 25px 50px 25px",
    background: "#f5f7fb",
    boxSizing: "border-box",
  }}
>
          <div
            onMouseEnter={() => setHoveredWord("card")}
            onMouseLeave={() => setHoveredWord(null)}
            style={{
              width: "100%",
              maxWidth: "620px",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "35px 38px",
              boxShadow:
                hoveredWord === "card"
                  ? "0 22px 55px rgba(25,35,50,0.15)"
                  : "0 15px 45px rgba(25, 35, 50, 0.10)",
              transform:
                hoveredWord === "card"
                  ? "translateY(-4px)"
                  : "translateY(0)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <span
                style={{
                  display: "inline-block",
                  padding: "7px 14px",
                  borderRadius: "20px",
                  background: "#fff4cc",
                  color: "#a87800",
                  fontSize: "12px",
                  fontWeight: "700",
                  marginBottom: "12px",
                }}
              >
                CREATE ACCOUNT
              </span>

              <h2
                onMouseEnter={() => setHoveredWord("create")}
                onMouseLeave={() => setHoveredWord(null)}
                className="fw-bold mb-2"
                style={{
                  color: "#111827",
                  fontSize: "30px",
                  display: "inline-block",
                  cursor: "default",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  transform:
                    hoveredWord === "create"
                      ? "translateX(5px) translateY(-2px)"
                      : "translateX(0) translateY(0)",
                }}
              >
                Create your account
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#7b8190",
                  fontSize: "14px",
                }}
              >
                Start your interview preparation journey with IntBuddy.
              </p>
            </div>

            <form onSubmit={registerUser}>
              {/* FULL NAME */}
              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "13px" }}
                >
                  Full Name
                </label>

                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: "#f7f8fa",
                      border: "1px solid #e1e5eb",
                      borderRight: "none",
                      color: "#89919e",
                    }}
                  >
                    <i className="bi bi-person"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{
                      height: "48px",
                      background: "#f7f8fa",
                      borderLeft: "none",
                      borderColor: "#e1e5eb",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              {/* EMAIL + PHONE */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Email Address
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-envelope"></i>
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Phone Number
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-telephone"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="phoneno"
                      placeholder="10 digit number"
                      value={formData.phoneno}
                      onChange={handleChange}
                      maxLength="10"
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* OTP */}
              {!otpSent && (
                <button
                  type="button"
                  className="btn w-100 mb-3 fw-semibold"
                  onClick={sendOtp}
                  disabled={loading}
                  style={{
                    height: "47px",
                    borderRadius: "10px",
                    background: "#ffbf00",
                    border: "none",
                    color: "#17191f",
                  }}
                >
                  <i className="bi bi-envelope-check me-2"></i>
                  {loading ? "Sending OTP..." : "Send Email OTP"}
                </button>
              )}

              {otpSent && !otpVerified && (
                <div
                  className="mb-3 p-3"
                  style={{
                    background: "#fffaf0",
                    border: "1px solid #f3df9a",
                    borderRadius: "12px",
                  }}
                >
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Enter Email OTP
                  </label>

                  <div className="input-group mb-2">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#fff",
                        borderColor: "#e1e5eb",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-shield-lock"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                      style={{
                        height: "48px",
                        borderColor: "#e1e5eb",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-dark w-100 fw-semibold"
                    onClick={verifyOtp}
                    disabled={loading}
                    style={{
                      height: "45px",
                      borderRadius: "9px",
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}

              {otpVerified && (
                <div
                  className="mb-3 d-flex align-items-center"
                  style={{
                    padding: "12px 15px",
                    borderRadius: "10px",
                    background: "#eaf8f0",
                    color: "#21864b",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Email OTP verified successfully
                </div>
              )}

              {/* PASSWORD */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Password
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-lock"></i>
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderRight: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />

                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderLeft: "none",
                        color: "#89919e",
                      }}
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

                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Confirm Password
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-lock-fill"></i>
                    </span>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderRight: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />

                    <button
                      type="button"
                      className="input-group-text"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderLeft: "none",
                        color: "#89919e",
                      }}
                    >
                      <i
                        className={
                          showConfirmPassword
                            ? "bi bi-eye-slash"
                            : "bi bi-eye"
                        }
                      ></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* GENDER */}
              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ fontSize: "13px" }}
                >
                  Gender
                </label>

                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: "#f7f8fa",
                      border: "1px solid #e1e5eb",
                      borderRight: "none",
                      color: "#89919e",
                    }}
                  >
                    <i className="bi bi-gender-ambiguous"></i>
                  </span>

                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    style={{
                      height: "48px",
                      backgroundColor: "#f7f8fa",
                      borderLeft: "none",
                      borderColor: "#e1e5eb",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              {/* COUNTRY + STATE */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Country
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-globe"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    State
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        background: "#f7f8fa",
                        border: "1px solid #e1e5eb",
                        borderRight: "none",
                        color: "#89919e",
                      }}
                    >
                      <i className="bi bi-geo-alt"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      style={{
                        height: "48px",
                        background: "#f7f8fa",
                        borderLeft: "none",
                        borderColor: "#e1e5eb",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="btn w-100 fw-bold"
                disabled={!otpVerified || loading}
                style={{
                  height: "50px",
                  borderRadius: "11px",
                  background:
                    !otpVerified || loading ? "#c8cbd0" : "#ffbf00",
                  color: "#17191f",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.3s ease",
                  transform:
                    !otpVerified || loading
                      ? "translateY(0)"
                      : hoveredWord === "register"
                        ? "translateY(-3px)"
                        : "translateY(0)",
                  boxShadow:
                    !otpVerified || loading
                      ? "none"
                      : hoveredWord === "register"
                        ? "0 10px 24px rgba(255,191,0,0.28)"
                        : "none",
                }}
                onMouseEnter={() => setHoveredWord("register")}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <i className="bi bi-arrow-right ms-2"></i>
                  </>
                )}
              </button>
            </form>

            {/* MESSAGE */}
            {message && (
              <div
                className="mt-3 text-center"
                style={{
                  padding: "10px 12px",
                  borderRadius: "9px",
                  background:
                    message.includes("successfully") ||
                    message.includes("verified")
                      ? "#eaf8f0"
                      : "#fff3f3",
                  color:
                    message.includes("successfully") ||
                    message.includes("verified")
                      ? "#21864b"
                      : "#c0392b",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {message}
              </div>
            )}

            {/* LOGIN LINK */}
            <div
              className="text-center mt-4"
              style={{
                fontSize: "13px",
                color: "#7b8190",
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#b58200",
                  fontWeight: "700",
                  padding: "0",
                }}
              >
                Sign In
              </button>
            </div>

            {/* SECURITY */}
            <div
              className="text-center mt-3"
              style={{
                background: "#f7f8fa",
                borderRadius: "10px",
                padding: "10px",
                color: "#7b8190",
                fontSize: "11px",
              }}
            >
              <i
                className="bi bi-shield-check me-1"
                style={{ color: "#2ca66f" }}
              ></i>
              Your account information is securely protected.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;