import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

function Benefits() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  const benefits = [
    {
  icon: "bi-linkedin",
  title: "LinkedIn Exposure",
  description:
    "Boost your professional visibility and strengthen your personal brand by sharing your interview journey.",
  path: "/community",
},   
   {
  icon: "bi-trophy-fill",
  title: "Win Rewards",
  description:
    "Get a chance to earn exciting rewards and recognition for contributing valuable interview experiences.",
  path: "/rewards",
},
   {
  icon: "bi-journal-check",
  title: "Get Published",
  description:
    "Have your interview story featured on IntBuddy and inspire thousands of aspiring candidates.",
  path: "/publish",
},
   {
  icon: "bi-people-fill",
  title: "Mentorship Impact",
  description:
    "Help students and job seekers prepare better by sharing real-world interview insights.",
  path: "/mentorship",
},
  ];

  return (
    <section className="benefits-section py-5 overflow-hidden">
      <div className="container py-lg-5">
        
        {/* HEADER */}
        <div
          className={`text-center mb-5 ${
            show ? "header-show" : "header-hide"
          }`}
        >
          <span className="section-tag floating-badge">
            WHY CONTRIBUTE
          </span>

          <h2 className="display-2 fw-bold mt-4 mb-3 floating-heading">
            Benefits for
            <span className="text-warning"> You</span>
          </h2>

          <p
            className="lead text-secondary mx-auto floating-text"
            style={{ maxWidth: "750px" }}
          >
            Share your interview experience, build your professional
            presence, help thousands of candidates, and unlock exciting
            rewards while contributing to the IntBuddy community.
          </p>
        </div>

        {/* BENEFIT CARDS */}
        <div className="row g-4 justify-content-center">
          {benefits.map((item, index) => (
            <div
              className={`col-lg-3 col-md-6 ${
                show ? `fade-up delay-${index + 1}` : ""
              }`}
              key={index}
            >
              <div
  className="benefit-card text-center"
  onClick={() => {
    if (item.path) {
      navigate(item.path);
    }
  }}
  style={{
    cursor: item.path ? "pointer" : "default",
  }}
>
                <div className="card-glow"></div>

                <div className="icon-box">
                  <i className={`bi ${item.icon}`}></i>
                </div>

                <h5 className="fw-bold mt-4 mb-3">
                  {item.title}
                </h5>

                <p className="text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

export default Benefits;