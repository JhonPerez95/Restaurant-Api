const express = require("express");

// Initializations
const app = express();

// Settings
port = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index.router"));

// Database run
require("./database");

module.exports = app;
