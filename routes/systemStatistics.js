/**
 * Route to get system statistics of server
 * Robin Branders
 */

const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../oauth/verifyJWT");

router.use(verifyJWT);

router.get("/info", (req, res) => {
    res.json({
        serverName: "Cristal",
        author: "Robin Branders",
        version: 1
    });
});

module.exports = router;
