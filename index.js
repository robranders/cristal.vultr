/**
 * Express API Server
 * Robin Branders
 */

// ENV
const PORT = process.env.CRISTAL_PORT;

// Express server
const express = require("express");
const app = express();

// Routes
const tokenRequest = require("./routes/tokenRequest");
const systemRoute = require("./routes/systemStatistics");

// Post middleware
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", tokenRequest);
app.use("/system", systemRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
