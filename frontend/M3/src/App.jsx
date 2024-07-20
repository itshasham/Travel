import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "./pages/Home";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import  About  from './pages/About';
import Logout from './pages/Logout'
const App = () => {
  return (

    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
