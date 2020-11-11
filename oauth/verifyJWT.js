/**
 * Middleware to verify incomming requests
 * Robin Branders
 */

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
    path.join(__dirname, "keys", "server_public.pem")
);

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ").pop();
    if (token == null || token == undefined) return res.sendStatus(401);

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log({ decoded });
        next();
    });
};

module.exports = { verifyJWT };
