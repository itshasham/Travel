// ContactUs.jsx

import React from 'react';
import { useState } from 'react';
import { useAuth } from '../store/token';

const defaultContactFormData = {
  email: "",
  phoneno: "",
  message: "",
};

const ContactUs = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setData(defaultContactFormData);
        const responseData = await response.json();
        alert(responseData);
        console.log(responseData);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-half-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>
          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="email">Email</label>
                {console.log(data)}
                <input
                
                  type="text"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneno">Phone No</label>
                <input
                  type="text"
                  name="phoneno"
                  id="phoneno"
                  value={data.phoneno}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={data.message}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
