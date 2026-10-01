import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="about-section py-5 overflow-hidden">
        <div className="container py-lg-5">
          
          {/* HEADER */}
          <div
            className={`text-center mb-5 ${
              isVisible ? "header-show" : "header-hide"
            }`}
          >
            <span className="section-tag floating-badge">
              ABOUT INTBUDDY
            </span>

            <h2 className="display-2 fw-bold mt-4 mb-3 floating-heading">
              Turning Interview Experiences Into
              <span className="text-warning"> Career Success</span>
            </h2>

            <p
              className="lead text-secondary mx-auto floating-text"
              style={{ maxWidth: "750px" }}
            >
              Discover real interview experiences, company insights, and
              preparation strategies shared by candidates to help you
              confidently achieve your career goals.
            </p>
          </div>

          {/* CARDS */}
          <div className="row g-4">
            {/* CARD 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="about-card">
                <div className="image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                    alt="About IntBuddy"
                    className="about-img"
                  />

                  <div className="card-badge">
                    <i className="bi bi-building me-2"></i>
                    About Us
                  </div>
                </div>

                <div className="card-content">
                  <div className="about-icon">
                    <i className="bi bi-building"></i>
                  </div>

                  <h4 className="fw-bold mt-3 mb-3">
                    Who We Are
                  </h4>

                  <p className="text-muted">
                    IntBuddy is a community-driven platform that helps students
                    and professionals prepare for interviews through authentic
                    experiences, company insights, and practical guidance from
                    successful candidates.
                  </p>

                  <button className="btn btn-warning rounded-pill px-4 mt-2">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="about-card featured-card">
                <div className="image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                    alt="Mission"
                    className="about-img"
                  />

                  <div className="card-badge">
                    <i className="bi bi-bullseye me-2"></i>
                    Mission
                  </div>
                </div>

                <div className="card-content">
                  <div className="about-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>

                  <h4 className="fw-bold text-warning mt-3 mb-3">
                    Our Mission
                  </h4>

                  <p className="text-light opacity-75">
                    We believe every candidate deserves access to authentic
                    interview knowledge. Our mission is to make preparation
                    transparent, accessible, and effective for everyone.
                  </p>

                  <button className="btn btn-warning rounded-pill px-4 mt-2">
                    Explore More
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-lg-4 col-md-12">
              <div className="about-card">
                <div className="image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Success"
                    className="about-img"
                  />

                  <div className="card-badge">
                    <i className="bi bi-stars me-2"></i>
                    Why Us
                  </div>
                </div>

                <div className="card-content">
                  <div className="about-icon">
                    <i className="bi bi-stars"></i>
                  </div>

                  <h4 className="fw-bold mt-3 mb-3">
                    Why Choose IntBuddy?
                  </h4>

                  <p className="text-muted">
                    Explore company-specific interview patterns, preparation
                    strategies, and candidate experiences that help you approach
                    interviews with confidence and clarity.
                  </p>

                  <button className="btn btn-outline-warning rounded-pill px-4 mt-2">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="row mt-5 g-4">
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <h2>5K+</h2>
                <p>Students Helped</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="stat-card">
                <h2>500+</h2>
                <p>Interview Stories</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="stat-card">
                <h2>100+</h2>
                <p>Companies Covered</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="stat-card">
                <h2>95%</h2>
                <p>User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

export default About;