import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Adjust the path as per your project structure
import './Navbar.css'; // Adjust the path if needed

const Navbar = () => {
  return (
    <header className='header1'>
      <nav className='navbar'>
        <div className="container">
          <div className='logo'>
            {/* <img src={logo} alt="logo" style={{ width: '7em', height: '6.6em' }} /> */}
          </div>
          <ul className='nav-item'>
            <li className="nav-items">
              <Link to="/">HOME</Link>
            </li>
            <li className="nav-items">
              <Link to="/ContactUs">Contact US</Link>
            </li>
            <li className="nav-items">
              <Link to="/About">About</Link>
            </li>
            <li className="nav-items">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-items">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      
    </header>
  );
}

export default Navbar;
