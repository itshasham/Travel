const express = require('express');
const router = express.Router();
const Contact = require('../models/schema-contact'); 

const contact = async (req, res) => {
    try {
        const response = req.body; // Corrected typo here
        await Contact.create(response);
        return res.status(200).json({
            msg: "Message sent successfully"
        });
    } catch (error) {
        res.status(500).send("Contact message not delivered");
    }
};

module.exports = contact;
