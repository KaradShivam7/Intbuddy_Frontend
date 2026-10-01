import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
import api from "../axiosConfig";

import "./CustomerDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AddExperience({ onExperienceAdded }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState(null);

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");



  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    role: "",
    experianceinyear: "",
    details: "",
    result: "",
  });

  const [detailsList, setDetailsList] = useState([""]);

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDetailsChange = (index, value) => {

  const updated = [...detailsList];

  updated[index] = value;

  if (
    index === detailsList.length - 1 &&
    value.trim() !== ""
  ) {
    updated.push("");
  }

  setDetailsList(updated);
};
  // SUBMIT EXPERIENCE
 const submitExperience = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);
    setMessage("");

    // ==============================
    // GET LOGGED USER
    // ==============================

    const storedUser = localStorage.getItem("userData");

    if (!storedUser) {

      setMessage("Please login again.");

      navigate("/login");

      return;
    }

    const user = JSON.parse(storedUser);

    console.log("Logged User:", user);
    console.log("Logged User ID:", user.id);

    if (!user.id) {

      setMessage(
        "User ID is missing. Please logout and login again."
      );

      return;
    }


    // ==============================
    // EXPERIENCE OBJECT
    // ==============================

    const experienceData = {

      companyName: formData.companyName,

      position: formData.position,

      role: formData.role,

      experianceinyear:
        formData.experianceinyear,

      details: detailsList
        .filter(detail => detail.trim() !== "")
        .map(
          (detail, index) =>
            `${index + 1}. ${detail}`
        )
        .join("\n"),

      result:
        formData.result === "true",

      // IMPORTANT
      user: {
        id: Number(user.id)
      }
    };


    console.log(
      "Experience Data:",
      experienceData
    );


    // ==============================
    // CREATE FORM DATA
    // ==============================

    const form = new FormData();
    


    // Experience JSON
    form.append(
      "experience",
      new Blob(
        [
          JSON.stringify(experienceData)
        ],
        {
          type: "application/json"
        }
      )
    );
    form.append(
    "userId",
    String(user.id)
);


    // Resume
    if (resume) {

      form.append(
        "resume",
        resume
      );

    }


    console.log(
      "User ID sent inside experience:",
      user.id
    );


    // ==============================
    // API CALL
    // ==============================

    const response = await api.post(
  "/Experiance/add",
  form
);

console.log("Experience Added:", response.data);

// User-specific localStorage key
const experienceKey = `experiences_${user.id}`;

// Get old experiences
const oldExperiences = JSON.parse(
  localStorage.getItem(experienceKey) || "[]"
);

// New experience
const newExperience = response.data;

// Add new experience
const updatedExperiences = [
  newExperience,
  ...oldExperiences
];

// Save experiences for this user
localStorage.setItem(
  experienceKey,
  JSON.stringify(updatedExperiences)
);

console.log(
  "Experiences Saved:",
  updatedExperiences
);

// Update dashboard immediately
if (onExperienceAdded) {
  onExperienceAdded(newExperience);
}

setMessage("Experience Added Successfully ✅");

alert("Interview Experience Added Successfully");





alert("Interview Experience Added Successfully");

// Reset form
setFormData({
  companyName: "",
  position: "",
  role: "",
  experianceinyear: "",
  details: "",
  result: ""
});

setDetailsList([""]);

setResume(null);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}


  } catch (error) {

    console.error(
      "Add Experience Error:",
      error
    );

    console.error(
      "Backend Response:",
      error.response?.data
    );


    if (error.response) {

      setMessage(
        error.response.data?.message ||
        error.response.data ||
        "Server Error"
      );

    } else if (error.request) {

      setMessage(
        "Cannot connect to Spring Boot Server"
      );

    } else {

      setMessage(
        "Something went wrong"
      );

    }

  } finally {

    setLoading(false);

  }

};
    
  return (

    <div className="card border-0 shadow-lg rounded-5 p-5 bg-white">

      <h2 className="fw-bold mb-4 text-dark">

        Add Interview Experience

      </h2>

      {message && (

        <div className="alert alert-warning">

          {message}

        </div>
      )}

      <form onSubmit={submitExperience}>

        {/* COMPANY */}
        <div className="mb-4">

          <label className="fw-semibold mb-2">
            Company Name
          </label>

          <input
            type="text"
            className="form-control rounded-4 p-3"
            placeholder="Enter company name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

        </div>

        {/* POSITION */}
        <div className="mb-4">

          <label className="fw-semibold mb-2">
            Position
          </label>

          <input
            type="text"
            className="form-control rounded-4 p-3"
            placeholder="Enter position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />

        </div>

        {/* ROLE */}
        <div className="mb-4">

          <label className="fw-semibold mb-2">
            Role
          </label>

          <input
            type="text"
            className="form-control rounded-4 p-3"
            placeholder="Enter role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />

        </div>

        {/* EXPERIENCE */}
        <div className="mb-4">

          <label className="fw-semibold mb-2">
            Experience
          </label>

          <select
            className="form-control rounded-4 p-3"
            name="experianceinyear"
            value={formData.experianceinyear}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Experience
            </option>

            <option value="Fresher">
              Fresher
            </option>

            <option value="0-2 Years">
              0-2 Years
            </option>

            <option value="2+ Years">
              2+ Years
            </option>

          </select>

        </div>

        {/* OFFER */}
        <div className="mb-4">

          <label className="fw-semibold d-block mb-2">
            Got Offer?
          </label>

          <div className="d-flex gap-4">

            <div className="form-check">

              <input
                type="radio"
                className="form-check-input"
                name="result"
                value="true"
                checked={formData.result === "true"}
                onChange={handleChange}
              />

              <label className="form-check-label">
                Yes
              </label>

            </div>

            <div className="form-check">

              <input
                type="radio"
                className="form-check-input"
                name="result"
                value="false"
                checked={formData.result === "false"}
                onChange={handleChange}
              />

              <label className="form-check-label">
                No
              </label>

            </div>

          </div>

        </div>

        {/* DETAILS */}
       <div className="mb-4">

  <label className="fw-bold mb-3">
    Experience Details
  </label>

  {
  detailsList.map((detail, index) => (

    <div key={index} className="mb-3">

      <textarea
        rows="4"
        className="form-control rounded-4 p-3"
        placeholder={`Experience Detail ${index + 1}`}
        value={detail}
        onChange={(e) =>
          handleDetailsChange(index, e.target.value)
        }
      />

    </div>

  ))}




</div>

<div className="mb-4">

<label className="fw-bold mb-2">

Upload Resume (PDF only, Max 1 MB)

</label>

<input

ref={fileInputRef}

type="file"

accept=".pdf"

className="form-control"

onChange={(e)=>{

const file=e.target.files[0];

if(!file) return;

if(file.type!=="application/pdf"){

alert("Only PDF file allowed");

e.target.value="";

return;

}

if(file.size>1024*1024){

alert("Resume size should be less than 1 MB");

e.target.value="";

return;

}

setResume(file);

}}

/>

<small className="text-muted">

Only PDF • Maximum 1 MB

</small>

</div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn btn-warning px-5 py-3 rounded-4 fw-bold"
          disabled={loading}
        >

          {loading
            ? "Submitting..."
            : "Submit Experience"}

        </button>

      </form>

    </div>
  );
}

function CustomerDashboard() {

  const [activeTab, setActiveTab] = useState("overview");
  const [experiences, setExperiences] = useState([]);
   


  const [user, setUser] = useState({
    id: "",
    fullName: "Guest User",
    email: "",
    phoneno: ""
  });

  const navigate = useNavigate();

  useEffect(() => {

  const data = localStorage.getItem("userData");

  if (!data) {
    setExperiences([]);
    return;
  }

  const parsed = JSON.parse(data);

  console.log("Logged User:", parsed);

  setUser({
    id: parsed.id,
    fullName: parsed.fullName,
    email: parsed.email,
    phoneno: parsed.phoneno
  });

  // Load logged user's experiences
  loadExperiences();

}, []);


 const loadExperiences = () => {

  try {

    const storedUser = localStorage.getItem("userData");

    if (!storedUser) {
      setExperiences([]);
      return;
    }

    const loggedUser = JSON.parse(storedUser);

    console.log("Logged User ID:", loggedUser.id);

    // User-specific experience key
    const experienceKey = `experiences_${loggedUser.id}`;

    // Get experiences from localStorage
    const storedExperiences =
      localStorage.getItem(experienceKey);

    if (storedExperiences) {

      const myExperiences =
        JSON.parse(storedExperiences);

      console.log(
        "My Stored Experiences:",
        myExperiences
      );

      setExperiences(myExperiences);

    } else {

      console.log("No stored experiences found.");

      setExperiences([]);

    }

  } catch (error) {

    console.error(
      "Loading stored experiences failed:",
      error
    );

    setExperiences([]);

  }
};

  const handleLogout = () => {

    localStorage.removeItem("userData");

    navigate("/login");
  };


  const getInitials = (name) => {

    if (!name) return "U";

    return name
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };


  return (

    <div className="dashboard-page">


     {/* =========================
    NAVBAR
========================= */}
{/* =========================
    NAVBAR
========================= */}

<nav
  style={{
    height: "72px",
    width: "100%",
    background: "#151619",
    display: "flex",
    alignItems: "center",
    padding: "0 25px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1000,
  }}
>

  {/* LOGO */}
  <Link
    to="/"
    style={{
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "22px",
      fontWeight: "800",
      minWidth: "120px",
    }}
  >
    Int<span style={{ color: "#ffbf00" }}>Buddy</span>
  </Link>


  {/* HOME ABOUT CONTACT */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "32px",
      marginLeft: "45px",
      whiteSpace: "nowrap",
    }}
  >

    <Link
      to="/"
      style={{
        color: "#ffbf00",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      Home
    </Link>

    <Link
      to="/about"
      style={{
        color: "#ffbf00",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      About
    </Link>

    <Link
      to="/contact"
      style={{
        color: "#ffbf00",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      Contact
    </Link>

  </div>


  {/* MOVING MESSAGE */}
  <div
    style={{
      flex: 1,
      height: "38px",
      marginLeft: "40px",
      marginRight: "30px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      background: "#202126",
      border: "1px solid rgba(255,191,0,0.25)",
      borderRadius: "20px",
    }}
  >

    <div
      style={{
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "500",
        paddingLeft: "100%",
        animation: "navbarMessage 20s linear infinite",
      }}
    >

      <i
        className="bi bi-megaphone-fill"
        style={{
          color: "#ffbf00",
        }}
      ></i>

      Please share your interview experience. It can be a great help to another candidate and inspire others to prepare confidently.

    </div>

  </div>


  {/* USER */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      minWidth: "150px",
      justifyContent: "flex-end",
    }}
  >

    <div className="dashboard-avatar-small">
      {getInitials(user.fullName)}
    </div>

    <div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: "700",
        }}
      >
        {user.fullName}
      </div>

      <div
        style={{
          color: "#999",
          fontSize: "10px",
        }}
      >
        Interview User
      </div>

    </div>

  </div>

</nav>


<style>
{`
@keyframes navbarMessage {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
`}
</style>


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-title">
          Workspace
        </div>


        <button
          className={`sidebar-btn ${
            activeTab === "overview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("overview")
          }
        >

          <i className="bi bi-grid-1x2-fill"></i>

          Overview

        </button>


        <button
          className={`sidebar-btn ${
            activeTab === "experience"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("experience")
          }
        >

          <i className="bi bi-plus-circle-fill"></i>

          Add Experience

        </button>


        <hr className="sidebar-divider" />


        <button
          className="sidebar-btn sidebar-logout"
          onClick={handleLogout}
        >

          <i className="bi bi-box-arrow-right"></i>

          Logout

        </button>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <main className="dashboard-main">

        <div className="dashboard-container">


          {/* =========================
              OVERVIEW
          ========================= */}

          {activeTab === "overview" && (

            <>

              {/* WELCOME */}

              <div className="dashboard-welcome">

                <div>

                  <h1>
                    Welcome back,{" "}
                    <span>
                      {user.fullName?.split(" ")[0]}
                    </span>
                    👋
                  </h1>

                  <p>
                    Manage your interview journey
                    and share your experiences.
                  </p>

                </div>

                <div className="dashboard-date">

                  <i className="bi bi-calendar3 me-2"></i>

                  Interview Dashboard

                </div>

              </div>


              {/* STATS */}

              <div className="stats-grid">


                <div className="stat-card">

                  <div className="stat-top">

                    <div className="stat-icon">
                      <i className="bi bi-person-check-fill"></i>
                    </div>

                  </div>

                  <div className="stat-label">
                    ACCOUNT STATUS
                  </div>

                  <div className="stat-value">
                    Active
                  </div>

                </div>


                <div className="stat-card">

                  <div className="stat-top">

                    <div className="stat-icon">
                      <i className="bi bi-briefcase-fill"></i>
                    </div>

                  </div>

                  <div className="stat-label">
                    INTERVIEW EXPERIENCES
                  </div>

                  <div className="stat-value">
                    {experiences.length}
                  </div>

                </div>


                <div className="stat-card">

                  <div className="stat-top">

                    <div className="stat-icon">
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>

                  </div>

                  <div className="stat-label">
                    COMMUNITY STATUS
                  </div>

                  <div className="stat-value">
                    Contributor
                  </div>

                </div>

              </div>


              {/* PROFILE */}

              <div className="profile-card">

                <div className="section-heading">
                  Profile Overview
                </div>

                <div className="profile-content">

                  <div className="profile-avatar">

                    {getInitials(
                      user.fullName
                    )}

                  </div>


                  <div>

                    <h3 className="profile-name">
                      {user.fullName}
                    </h3>

                    <div className="profile-email">
                      {user.email}
                    </div>


                    <div className="profile-details">

                      <div className="profile-info">

                        <i className="bi bi-envelope-fill"></i>

                        {user.email}

                      </div>


                      {user.phoneno && (

                        <div className="profile-info">

                          <i className="bi bi-telephone-fill"></i>

                          {user.phoneno}

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>


             
            </>
            

          )}


{/* =========================
    EXPERIENCES
========================= */}

<div className="experience-section">

  <div className="section-heading">
    My Interview Experiences
  </div>


{experiences.length === 0 ? (

    <div className="empty-experience">

      <div className="empty-icon">

        <i className="bi bi-search"></i>

      </div>


     <h5>
  No Experience Added Yet
</h5>

<p>
  You can share your interview experience. Please add your experience
  and help other candidates.
</p>

<button
  className="btn btn-warning rounded-3 px-4 mt-2 fw-semibold"
  onClick={() => setActiveTab("experience")}
>
  <i className="bi bi-plus-circle me-2"></i>
  Share Your Experience
</button>

      

    </div>

  ) : (

    <>

      


      {experiences.map(
  (exp, index) => (

          <div
            className="experience-card"
            key={index}
          >

            <div className="experience-header">

              <div>

                <h4 className="company-name">
                  {exp.companyName}
                </h4>


                <div className="position-text">

                  {exp.position}

                  {exp.role &&
                    ` • ${exp.role}`}

                </div>

              </div>


              <span
                className={`experience-badge ${
                  exp.result
                    ? "badge-selected"
                    : "badge-rejected"
                }`}
              >

                <i
                  className={
                    exp.result
                      ? "bi bi-check-circle-fill me-1"
                      : "bi bi-x-circle-fill me-1"
                  }
                ></i>

                {exp.result
                  ? "Selected"
                  : "Not Selected"}

              </span>

            </div>


            <div className="experience-meta">

              <div className="meta-item">

                <i className="bi bi-person-workspace"></i>

                {exp.role}

              </div>


              <div className="meta-item">

                <i className="bi bi-clock-fill"></i>

                {exp.experianceinyear}

              </div>

            </div>


            {exp.details && (

              <div className="experience-details">

                <strong>
                  Interview Details
                </strong>

                <br />

                {exp.details}

              </div>

            )}


            {exp.resumeName && (

              <a
                href={`http://localhost:9090/Experiance/resume/${exp.experiance_ID}`}
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >

                <i className="bi bi-file-earmark-pdf-fill me-2"></i>

                View Resume

              </a>

            )}

          </div>

        )
      )}

    </>

  )}

</div>
          {/* =========================
              ADD EXPERIENCE
          ========================= */}

          {activeTab === "experience" && (

            <div>

              <div className="dashboard-welcome">

                <div>

                  <h1>
                    Add Interview Experience
                  </h1>

                  <p>
                    Share your interview journey
                    with the IntBuddy community.
                  </p>

                </div>

              </div>

            <AddExperience
  onExperienceAdded={(newExperience) => {

    setExperiences((prev) => [
      newExperience,
      ...prev
    ]);

  }}
/>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default CustomerDashboard;