import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/images/p1.png'
import { useAuth } from "../store/token";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            
            <NavLink to="/">
            <img src={logo} alt="logo" width="10%" />
            </NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>

              <li>
                <NavLink to="/pay"> pay </NavLink>
              </li> 
              <li>
                <NavLink to="/Services"> Services </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/logout"> Logout </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contactus"> Contact </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
