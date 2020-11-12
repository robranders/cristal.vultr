/**
 * Middleware to verify incomming requests
 * Robin Branders
 */

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
    path.join(__dirname, "keys", "clickGateway_public.pem")
);

const verifyRequestToken = (req, res, next) => {
    const { body } = req;
    const token = body && body.token;
    if (token == null || token == undefined) return res.sendStatus(401);

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.clientId = decoded.clientId;
        req.clientSecret = decoded.clientSecret;
        next();
    });
};

module.exports = { verifyRequestToken };
