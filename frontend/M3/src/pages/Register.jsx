import React, { useState } from 'react';
import './Register.css'; // Import your CSS file for styling
import natureImage from '../assets/images/register.jpg'; // Import your image

const Register = () => {
  const [user, setUser] = useState({
    username: "hasham",
    email: "",
    phoneno: "123569876",
    password: "113131313",
  });

  const [error, setError] = useState("");

 const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", user);

    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true,
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error response body
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful');
      // Redirect or update UI based on success
    } catch (error) {
      console.error('Fetch error:', error);
     
      alert('Registration failed. Please try again.'); // Display user-friendly message
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src={natureImage} alt="Registration" />
      </div>
      <div className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              value={user.phoneno}
              onChange={handleInput}
              placeholder="Enter your phone number"
              autoComplete="off"
            />
          </div>
          <button  className="btn-submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
