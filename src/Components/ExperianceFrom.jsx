import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function ExperienceForm({ closeModal }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    role: "",
    experianceinyear: "",
    details: "",
    result: ""
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // =========================
  // RESUME
  // =========================
  const handleResumeChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      setResume(null);
      return;
    }

    // Only PDF
    if (file.type !== "application/pdf") {

      alert("Only PDF file is allowed.");

      e.target.value = "";
      setResume(null);

      return;
    }

    // Maximum 1 MB
    if (file.size > 1024 * 1024) {

      alert("Resume size must be less than 1 MB.");

      e.target.value = "";
      setResume(null);

      return;
    }

    setResume(file);
  };

  // =========================
  // SUBMIT EXPERIENCE
  // =========================
  const saveExperience = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setMessage("");

      // =========================
      // GET LOGGED USER
      // =========================
      const storedUser = localStorage.getItem("userData");

      if (!storedUser) {

        setMessage("Please login again.");

        navigate("/login");

        return;
      }

      const user = JSON.parse(storedUser);

      console.log("Logged User:", user);
      console.log("Logged User ID:", user.id);

      // =========================
      // USER ID VALIDATION
      // =========================
      if (!user.id) {

        setMessage(
          "User ID is missing. Please logout and login again."
        );

        return;
      }

      // =========================
      // CREATE EXPERIENCE OBJECT
      // =========================
      const experience = {

        companyName: formData.companyName,

        position: formData.position,

        role: formData.role,

        experianceinyear:
          formData.experianceinyear,

        details: formData.details,

        result:
          formData.result === "true",

        user: {
          id: Number(user.id)
        }
      };

      console.log(
        "Experience Object:",
        experience
      );

      // =========================
      // FORM DATA
      // =========================
      const data = new FormData();

      data.append(
        "experience",
        new Blob(
          [JSON.stringify(experience)],
          {
            type: "application/json"
          }
        )
      );

      // Resume optional
      if (resume) {

        data.append(
          "resume",
          resume
        );

      }

      // =========================
      // API CALL
      // =========================
      const response = await api.post(
        "/Experiance/add",
        data
      );

      console.log(
        "Experience Added:",
        response.data
      );

      setMessage(
        "Interview experience added successfully ✅"
      );

      alert(
        "Interview Experience Added Successfully"
      );

      // =========================
      // RESET FORM
      // =========================
      setFormData({
        companyName: "",
        position: "",
        role: "",
        experianceinyear: "",
        details: "",
        result: ""
      });

      setResume(null);

      // Close modal if available
      if (closeModal) {
        closeModal();
      }

      // Dashboard वर refresh
      navigate("/CustomerDashboard");

    } catch (error) {

      console.error(
        "Add Experience Error:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      if (error.response) {

        setMessage(
          error.response.data?.message ||
          error.response.data ||
          "Failed to save experience."
        );

      } else if (error.request) {

        setMessage(
          "Backend server is not responding."
        );

      } else {

        setMessage(
          "Something went wrong."
        );
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        zIndex: 1050
      }}
    >

      <div className="modal-dialog modal-lg modal-dialog-centered">

        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "22px"
          }}
        >

          {/* HEADER */}

          <div className="modal-header border-0 px-4 pt-4">

            <div>

              <h3 className="fw-bold mb-1">
                Add Interview Experience
              </h3>

              <p className="text-muted mb-0">
                Share your interview journey with
                other candidates.
              </p>

            </div>

            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            />

          </div>

          {/* BODY */}

          <div className="modal-body px-4">

            {message && (

              <div className="alert alert-info">
                {message}
              </div>

            )}

            <form onSubmit={saveExperience}>

              <div className="row">

                {/* COMPANY */}

                <div className="col-md-6 mb-3">

                  <label className="fw-semibold mb-2">
                    Company Name
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="companyName"
                    placeholder="e.g. TCS, Infosys, Accenture"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* POSITION */}

                <div className="col-md-6 mb-3">

                  <label className="fw-semibold mb-2">
                    Position
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="position"
                    placeholder="e.g. Java Developer"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* ROLE */}

                <div className="col-md-6 mb-3">

                  <label className="fw-semibold mb-2">
                    Role
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="role"
                    placeholder="e.g. Software Developer"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EXPERIENCE */}

                <div className="col-md-6 mb-3">

                  <label className="fw-semibold mb-2">
                    Experience
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="experianceinyear"
                    placeholder="e.g. Fresher / 1 Year"
                    value={
                      formData.experianceinyear
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* RESULT */}

                <div className="col-12 mb-3">

                  <label className="fw-semibold mb-2">
                    Interview Result
                  </label>

                  <div>

                    <div className="form-check form-check-inline">

                      <input
                        className="form-check-input"
                        type="radio"
                        name="result"
                        value="true"
                        checked={
                          formData.result === "true"
                        }
                        onChange={handleChange}
                        required
                      />

                      <label className="form-check-label">
                        Selected
                      </label>

                    </div>

                    <div className="form-check form-check-inline">

                      <input
                        className="form-check-input"
                        type="radio"
                        name="result"
                        value="false"
                        checked={
                          formData.result === "false"
                        }
                        onChange={handleChange}
                      />

                      <label className="form-check-label">
                        Not Selected
                      </label>

                    </div>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="col-12 mb-3">

                  <label className="fw-semibold mb-2">
                    Interview Details
                  </label>

                  <textarea
                    className="form-control rounded-3"
                    rows="6"
                    name="details"
                    placeholder="Write interview questions, rounds, technical questions, HR experience etc."
                    value={formData.details}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* RESUME */}

                <div className="col-12 mb-3">

                  <label className="fw-semibold mb-2">
                    Upload Resume
                  </label>

                  <input
                    type="file"
                    className="form-control rounded-3"
                    accept=".pdf"
                    onChange={handleResumeChange}
                  />

                  <small className="text-muted">
                    PDF only • Maximum 1 MB
                  </small>

                </div>

              </div>

              {/* FOOTER */}

              <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-warning px-4 fw-semibold"
                  disabled={loading}
                >

                  {loading
                    ? "Saving..."
                    : "Submit Experience"}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ExperienceForm;