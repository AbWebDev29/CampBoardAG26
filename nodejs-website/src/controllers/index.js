const express = require('express');
const router = express.Router();

// Example controller methods
const getHomePage = (req, res) => {
    res.render('index'); // Render the main HTML view
};

const getData = async (req, res) => {
    try {
        // Logic to fetch data from MongoDB
        const data = await SomeModel.find(); // Replace SomeModel with your actual model
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
};

// Exporting the controller methods
module.exports = {
    getHomePage,
    getData
};