import React, { useEffect, useState } from "react";
import "../../CSS/Navbar/Navbar.css";
import { HiMenu } from "react-icons/hi";
import Logo from "../../Images/Logo-Navbar.png";
import { Link } from "react-router-dom";

function Navbar() {

  const onClickProducts=()=>{
    document.getElementById('navmainDiv').style.backgroundColor = '#30373f'
  }

  const notOnClickProducts=()=>{

  }

  return (
    <>
      <nav id="navmainDiv" className="navbar nav-desktop glass">
        <div className="d-flex nav-div">
          <div className="d-flex align-items-center nav-logo-div">
            <Link className="" to="/">
              <img className="nav-logo" src={Logo} alt="Wellcare" />
            </Link>
          </div>
          <ul className="nav-list-div">
            <li onClick={notOnClickProducts}>
              <Link className="nav-list-item" to="/">
                Home
              </Link>
            </li>
            <li onClick={onClickProducts}>
              <Link className="nav-list-item" to="/Products">
                Products
              </Link>
            </li>
            <li>
              <Link className="nav-list-item" to="/">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-list-item" to="/">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar nav-mobile">
        <div className="d-flex nav-div-mobile">
          <div className="nav-logo-div">
            <Link className="" to="/Home">
              <img className="nav-logo" src={Logo} alt="Wellcare" />
            </Link>
          </div>
          <div className="nav-mobile-main-div">
            <div
              className="button-nav-mobile"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <HiMenu />
            </div>

            <div
              className="offcanvas offcanvas-start"
              tabindex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header mobile-canvas-head">
                <button
                  type="button"
                  className="btn-close close-btn-mobile"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body mobile-canvas-body">
                <ul className="nav-list-div-mobile">
                  <li>
                    <Link className="nav-list-item-mobile" to="/Home">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-list-item-mobile" to="/">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-list-item-mobile" to="/">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-list-item-mobile" to="/">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
