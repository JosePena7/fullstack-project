import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top py-3 site-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold text-success fs-3" to="/">
          <i className="bi bi-patch-check-fill me-2"></i>
          <span>GRN<span className="text-dark">TKM</span></span>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link text-success fw-bold" : "nav-link"} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link text-success fw-bold" : "nav-link"} to="/services">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link text-success fw-bold" : "nav-link"} to="/about">
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link className="btn btn-brand px-4" to="/quote">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
