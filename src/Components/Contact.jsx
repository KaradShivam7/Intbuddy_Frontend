import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../axiosConfig";

function Contact() {
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
});

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

 const handleChange = (e) => {

    setContact({

        ...contact,

        [e.target.name]: e.target.value

    });

};

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/contact/send", contact);

        alert(response.data);

        setContact({
            name: "",
            email: "",
            message: "",
        });

    } catch (error) {

        alert("Failed to send message");

    }

};

  return (
    <section className="contact-section py-5 overflow-hidden">
      <div className="container py-lg-5">

        {/* Header */}
        <div
          className={`text-center mb-5 ${
            show ? "header-show" : "header-hide"
          }`}
        >
          <span className="section-tag floating-badge">
            CONTACT US
          </span>

          <h2 className="display-2 fw-bold mt-4 mb-3 floating-heading">
            Get In 
            <span className="text-warning"> Touch</span>
          </h2>

          <p
            className="lead text-secondary mx-auto floating-text"
            style={{ maxWidth: "750px" }}
          >
            Have questions, feedback, or suggestions? We'd love to hear
            from you and help make your interview journey better.
          </p>
        </div>

        {/* Contact Card */}
        <div
          className={`contact-wrapper ${
            show ? "card-show" : ""
          }`}
        >
          <div className="row g-0">

            {/* Left Side */}
            <div className="col-lg-5 contact-left">
              <div className="contact-content">

                <div className="contact-icon">
                  <i className="bi bi-chat-dots-fill"></i>
                </div>

                <h3 className="fw-bold mb-3">
                  Get In Touch
                </h3>

                <p className="opacity-75 mb-4">
                  Reach out for support, partnerships,
                  feedback, or any questions about IntBuddy.
                </p>

                <div className="contact-info">
                  <div className="info-item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>support@intbuddy.com</span>
                  </div>

                  <div className="info-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>India</span>
                  </div>

                  <div className="info-item">
                    <i className="bi bi-clock-fill"></i>
                    <span>24/7 Community Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-lg-7 bg-white">
              <div className="form-container">

                <h4 className="fw-bold mb-4 text-center">
                  Send a Message
                </h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                   <input
type="text"
name="name"
value={contact.name}
onChange={handleChange}
className="form-control custom-input"
placeholder="Your Name"
/>
                  </div>

                  <div className="mb-3">
                     <input
type="email"
name="email"
value={contact.email}
onChange={handleChange}
className="form-control custom-input"
placeholder="Your Email"
/>
                  </div>

                  <div className="mb-3">
                   <textarea
                    rows="5"
                     name="message"
                    value={contact.message}
onChange={handleChange}
className="form-control custom-input"
placeholder="Your Message"
/>
                  </div>

                  <div className="mb-3">
                   
                  </div>

                  <button
                    type="submit"
                    className="btn submit-btn w-100"
                  >
                    Send Message
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;