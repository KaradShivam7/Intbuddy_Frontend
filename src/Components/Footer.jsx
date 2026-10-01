import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          <div className="col-md-3 mb-4">
            <h5>About Us</h5>
            <p>a platform where users share real interview experiences to help job seekers prepare with practical insights. By building a community-driven knowledge base, we make interviews easier to understand and approach with confidence— for both freshers and experienced professionals.</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/Home" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/About" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/services" className="text-light text-decoration-none">Services</Link></li>
              <li><Link to="/Registration" className="text-light text-decoration-none">Registration</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Contact</h5>
            <p><i className="bi bi-geo-alt-fill"></i> Unique System SKills,Kothrud Pune, India</p>
            <p><i className="bi bi-telephone-fill"></i> +91 9730695484</p>
            <p><i className="bi bi-envelope-fill"></i> bhiseamar2003@gmail.com</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <Link to="#" className="text-light text-center"><i className="bi bi-facebook fs-3 d-block mb-1"></i>Facebook</Link>
              <Link to="#" className="text-light text-center"><i className="bi bi-twitter fs-3 d-block mb-1"></i>Twitter</Link>
              <Link to="#" className="text-light text-center"><i className="bi bi-instagram fs-3 d-block mb-1"></i>Instagram</Link>
              <Link to="#" className="text-light text-center"><i className="bi bi-linkedin fs-3 d-block mb-1"></i>LinkedIn</Link>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="row">
          <div className="col-12 text-center">
            <small>© 2026 IntBuddy.com. All rights reserved.</small>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;