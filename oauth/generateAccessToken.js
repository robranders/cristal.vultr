/**
 * Generate a server access token
 * validation of an incomming token request must be done beforehand
 *
 * Robin Branders
 */
const TOKEN_EXP_LENGTH = "60s";
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync(
    path.join(__dirname, "keys", "server_private.pem")
);

const getToken = (clientId) => {
    const accessToken = jwt.sign({ clientId }, privateKey, {
        algorithm: "RS256",
        expiresIn: TOKEN_EXP_LENGTH
    });

    return accessToken;
};

module.exports = { getToken };
