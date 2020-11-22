/**
 * Express API Server
 * Robin Branders
 */

// ENV
const PORT = process.env.CRISTAL_PORT;
const MORGAN_LEVEL = process.env.CRISTAL_DB_CRISTAL_DB_LOGLEVEL;

// Express server
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Routes
const tokenRequest = require("./routes/tokenRequest");
const systemRoute = require("./routes/systemStatistics");
const sensorRoute = require("./routes/sensorData");

// Post middleware
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "log", "access.log"),
    { flags: "a" }
);

// Morgan logger
app.use(morgan("common", { stream: accessLogStream }));

app.use("/auth", tokenRequest);
app.use("/system", systemRoute);
app.use("/sensors", sensorRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
