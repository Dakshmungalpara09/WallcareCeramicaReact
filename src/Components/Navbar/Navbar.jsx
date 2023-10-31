import React, { useEffect, useState } from "react";
import "../../CSS/Navbar/Navbar.css";
import { HiMenu } from "react-icons/hi";
import Logo from "../../Images/Logo-Navbar.png";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {

  const onClickProducts=()=>{
    document.getElementById('navmainDiv').style.backgroundColor = '#30373f'
  }

  const notOnClickProducts=()=>{

  }

  const OnClickMobileNavItems = () => {
    document.getElementById('mobileNavClose').click();
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
      <nav className="navbar nav-mobile" id="mobileNavbar">
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
                  style={{color:"white"}}
                  className="btn"
                  id="mobileNavClose"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ><AiOutlineClose/></button>
              </div>
              <div className="offcanvas-body mobile-canvas-body">
                <ul className="nav-list-div-mobile nav-list-div">
                  <li onClick={OnClickMobileNavItems}>
                    <Link className="nav-list-item-mobile" to="/">
                      Home
                    </Link>
                  </li>
                  <li onClick={OnClickMobileNavItems}>
                    <Link className="nav-list-item-mobile" to="/Products">
                      Products
                    </Link>
                  </li>
                  <li onClick={OnClickMobileNavItems}>
                    <Link className="nav-list-item-mobile" to="/">
                      About
                    </Link>
                  </li>
                  <li onClick={OnClickMobileNavItems}>
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
