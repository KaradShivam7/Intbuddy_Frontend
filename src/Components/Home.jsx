import React, { useState, useEffect } from "react";
import Hero from "../assets/hero.jpg";
import ExperienceForm from "./ExperianceFrom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const fullBlendMask = {
    WebkitMaskImage:
      "radial-gradient(ellipse 65% 50% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
    maskImage:
      "radial-gradient(ellipse 65% 50% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)",
    objectFit: "cover",
    width: "140%",
    height: "110vh",
    maxWidth: "1800px",
    filter: "drop-shadow(0 0 20px rgba( 0, 0, 0,1))",
    animation: "float 4s ease-in-out infinite"
  };

  return (
    <>
      {/* HOME */}
      <div
        className={`container-fluid min-vh-100 d-flex align-items-center bg-light p-0 overflow-hidden ${
          showForm ? "pe-none user-select-none" : ""
        }`}
        style={{
          filter: showForm ? "blur(6px)" : "none",
          transition: "0.3s ease"
        }}
      >
        <div className="row w-100 m-0 align-items-center">

          {/* LEFT */}
          <div
            className={`col-lg-5 col-xl-4 offset-xl-1 text-center text-lg-start ${
              loaded ? "fade-in-left" : ""
            }`}
          >
            <div className="border-start border-warning border-5 ps-4 py-3">

              <h1 className="fw-bold display-2 lh-1 text-dark mb-3">
                Land your <br />
                <span className="text-warning">Tech Dream.</span>
              </h1>

              <p className="lead text-secondary mt-3 fs-4 mb-5">
                Experience 1:1 coaching from elite tech professionals.
              </p>

              <button
                className="btn btn-warning rounded-pill px-5 py-3 fw-bold shadow-lg custom-btn"
                onClick={() => setShowForm(true)}
              >
                Share Experience <i className="bi bi-arrow-right ms-2"></i>
              </button>

            </div>
          </div>

          {/* RIGHT */}
          <div
            className={`col-lg-7 p-0 d-flex justify-content-center align-items-center position-relative min-vh-100 ${
              loaded ? "fade-in-right" : ""
            }`}
          >
            {/* Glow */}
            <div
              className="position-absolute top-50 start-50 translate-middle glow"
            ></div>

            {/* Image */}
            <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
              <img
                src={Hero}
                alt="mentor"
                style={fullBlendMask}
                className="position-relative hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <ExperienceForm closeModal={() => setShowForm(false)} />
      )}

    </>
  );
}

export default Home;