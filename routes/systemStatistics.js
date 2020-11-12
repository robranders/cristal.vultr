/**
 * Route to get system statistics of server
 * Robin Branders
 */

const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../oauth/verifyAccessToken");

router.use(verifyAccessToken);

router.get("/info", (req, res) => {
    res.json({
        serverName: "Cristal",
        author: "Robin Branders",
        version: 1
    });
});

module.exports = router;
