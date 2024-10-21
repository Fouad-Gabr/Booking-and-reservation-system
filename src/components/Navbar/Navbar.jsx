import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-md-center sticky-top">
      <div className="container">
        <Link className="navbar-brand ps-3" to="/">
          <img src={logo} className="mb-3" alt="Logo" width="75" height="70" />
          <h1 className="site-name-h1">EasyReserve</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            action="#"
            className="ms-3 d-flex position-relative flex-grow-1 flex-lg-grow-0 mb-3 mb-lg-0"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="position-absolute"
            />
            <input
              className="form-control ps-5 btn-outline-none mt-2 mt-md-0"
              type="search"
              placeholder="View Available Services "
              aria-label="Search"
            />
          </form>

          <ul className="navbar-nav ms-lg-auto ps-3 mb-2 mb-lg-0 gap-md-3 gap-lg-4">
            <li className="nav-item">
              <Link className="nav-link" to="/businesses">
                For Businesses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/success">
                Success
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
