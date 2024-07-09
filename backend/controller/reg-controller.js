const express = require('express');
const router = express.Router();
const User = require('../models/schema-reg'); // Adjust the path based on your project structure
const bcrypt=require('bcryptjs');
const home = async (req, res) => {
  try {
    res.send("hello hasham by auth - controller home");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).send("Server Error");
  }
};

const register = async (req, res) => {
  const { username, email, password, phoneno } = req.body;
  console.log(phoneno);
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password, phoneno });
    await newUser.save();

    // Generate token
    const token = newUser.generateToken();

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token: token,
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error('Error in register controller:', error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    res.status(500).json({ error: 'Server Error' });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        // Logging to debug password comparison
        // console.log('Stored hashed password:', userExist.password);
        // console.log('Password to compare:', password);

        // Correct usage of bcrypt.compare with await
        const user = await userExist.comparePassword(password);
        // Logging to debug password comparison result
        console.log('Is password correct:',user);

        if (user) {
            const token = await userExist.generateToken();
            return res.status(200).json({
                message: 'User logged in successfully',
                token: token,
                userId: userExist._id.toString(),
            });
        } else {
            return res.status(401).json({ msg: 'Incorrect Email or Password' });
        }
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ msg: "Server Error" });
    }
};


module.exports = { home, register, login };
