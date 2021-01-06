const express = require('express');
var path = require('path');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = express.Router();
// const PORT = 3000;
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());  

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});