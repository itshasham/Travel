import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import loginImage from '../assets/images/london.jpg'; // Import your image

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
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
      const response = await fetch(`http://localhost:8080/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error response body
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      alert('Login successful');
      // Redirect or update UI based on success
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Login failed. Please try again.'); // Display user-friendly message
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        
      </div>
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button className="btn-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
