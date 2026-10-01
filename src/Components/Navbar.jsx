import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import intbuddylogo from "../assets/intbuddylogo.png";

function Navbar() {

  const [search, setSearch] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // CHECK LOGGED USER
  // =========================
  useEffect(() => {

    const userData = localStorage.getItem("userData");

    if (userData) {

      try {

        const parsedUser = JSON.parse(userData);

        setLoggedUser(parsedUser);

      } catch (error) {

        console.error("Invalid userData:", error);

        localStorage.removeItem("userData");

        setLoggedUser(null);
      }

    } else {

      setLoggedUser(null);

    }

  }, [location.pathname]);


  // =========================
  // SEARCH
  // =========================
  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim() === "") return;

    navigate(`/search?keyword=${encodeURIComponent(search.trim())}`);

  };


  // =========================
  // GET USER INITIALS
  // =========================
  const getInitials = (name) => {

    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  };


  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem("userData");

    setLoggedUser(null);

    navigate("/Login");

  };


  return (

    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "#1F1F1F",
        boxShadow: "0 3px 18px rgba(0,0,0,0.45)",
        borderBottom: "1px solid rgba(12, 12, 12, 0.12)",
        minHeight: "80px",
        zIndex: 1000
      }}
    >

      <div className="container-fluid px-4">


        {/* =========================
            LOGO
        ========================= */}

        <Link
          className="navbar-brand me-4"
          to="/"
        >

          <img
            src={intbuddylogo}
            alt="IntBuddy Logo"
            style={{
              height: "58px",
              width: "auto",
              objectFit: "contain"
            }}
          />

        </Link>


        {/* =========================
            MOBILE TOGGLE
        ========================= */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: "1px solid #D4AF37"
          }}
        >

          <span
            className="navbar-toggler-icon"
            style={{
              filter: "invert(1)"
            }}
          ></span>

        </button>


        {/* =========================
            NAVBAR CONTENT
        ========================= */}

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >


          {/* =========================
              MENU
          ========================= */}

          <ul className="navbar-nav me-4">

            <li className="nav-item">

              <Link
                to="/"
                className="nav-link fw-bold px-3"
                style={{
                  color: "#D4AF37",
                  fontSize: "19px"
                }}
              >
                Home
              </Link>

            </li>


            <li className="nav-item">

              <Link
                to="/About"
                className="nav-link fw-bold px-3"
                style={{
                  color: "#D4AF37",
                  fontSize: "19px"
                }}
              >
                About
              </Link>

            </li>


            <li className="nav-item">

              <Link
                to="/Contact"
                className="nav-link fw-bold px-3"
                style={{
                  color: "#D4AF37",
                  fontSize: "19px"
                }}
              >
                Contact
              </Link>

            </li>

          </ul>


          {/* =========================
              SEARCH
          ========================= */}

          <form
            className="d-flex flex-grow-1 mx-4 my-3 my-lg-0"
            onSubmit={handleSearch}
          >

            <input
              type="search"
              className="form-control rounded-pill me-2"
              placeholder="Search Company, Role, Position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "#FFFFFF",
                color: "#000",
                border: "none",
                height: "45px",
                fontSize: "15px",
                paddingLeft: "20px"
              }}
            />


           


          </form>


          {/* =================================================
              NOT LOGGED IN
              SHOW LOGIN + REGISTER
          ================================================= */}

          {!loggedUser && (

            <div className="d-flex gap-2">

              <Link
                to="/Login"
                className="btn rounded-pill px-4 fw-semibold"
                style={{
                  border: "2px solid #D4AF37",
                  color: "#D4AF37",
                  minWidth: "100px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >

                Login

              </Link>


              <Link
                to="/Registration"
                className="btn rounded-pill px-4 fw-semibold"
                style={{
                  background: "#D4AF37",
                  color: "#222",
                  border: "none",
                  minWidth: "110px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >

                Register

              </Link>

            </div>

          )}


          {/* =================================================
              LOGGED IN
              SHOW USER + LOGOUT
          ================================================= */}

          {loggedUser && (

            <div
              className="d-flex align-items-center ms-auto"
              style={{
                gap: "12px"
              }}
            >

              {/* USER PROFILE */}

              <div
  className="d-flex align-items-center"
  onClick={() => navigate("/CustomerDashboard")}
  style={{
    gap: "10px",
    cursor: "pointer"
  }}
>

                {/* USER ICON */}

                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#D4AF37",
                    color: "#1F1F1F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "14px",
                    boxShadow: "0 3px 10px rgba(212,175,55,0.3)"
                  }}
                >

                  {getInitials(loggedUser.fullName)}

                </div>


                {/* USER NAME */}

                <div
                  className="d-none d-lg-block"
                  style={{
                    lineHeight: "1.2"
                  }}
                >

                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "700"
                    }}
                  >

                    {loggedUser.fullName}

                  </div>


                  <div
                    style={{
                      color: "#D4AF37",
                      fontSize: "11px"
                    }}
                  >

                    Interview User

                  </div>

                </div>

              </div>


              {/* LOGOUT BUTTON */}

              <button
                type="button"
                onClick={handleLogout}
                className="btn rounded-pill fw-semibold"
                style={{
                  border: "1px solid #D4AF37",
                  color: "#D4AF37",
                  background: "transparent",
                  minWidth: "105px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >

                <i className="bi bi-box-arrow-right"></i>

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;