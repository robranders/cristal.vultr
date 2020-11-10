const TOKEN_EXP_LENGTH = "60s";

const {
    authApiClient,
    addUpdateApiClient
} = require("../db/Route_tokenRequest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/token", (req, res) => {
    const { body } = req;
    const { clientId, clientSecret } = body;

    if (clientId === undefined || clientSecret === undefined) {
        res.status(400).send("Missing Credentials");
    } else {
        authApiClient(clientId, async (dbRes, err) => {
            if (err === null) {
                const { msg, clientHash } = dbRes;
                if (clientHash === undefined) {
                    res.send("Bad Credentials");
                } else {
                    if (await bcrypt.compare(clientSecret, clientHash)) {
                        //Generate token
                        const accessToken = jwt.sign(
                            { clientId },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: TOKEN_EXP_LENGTH
                            }
                        );
                        res.json({
                            accessToken,
                            tokenType: "Bearer"
                        });
                    } else {
                        res.send("Bad Credentials");
                    }
                }
            } else {
                res.status(500).send(err.message);
            }
        });
    }
});

const onlyLocalHost = (req, res, next) => {
    const host = req.get("host");
    if (host.split(":").shift() === "localhost") {
        next();
    } else {
        res.status(403).send("Only localhost allowed");
    }
};

router.post("/addUpdateApiClient", onlyLocalHost, async (req, res) => {
    const { body } = req;
    const { clientId, clientSecret } = body;

    if (clientId === undefined || clientSecret === undefined) {
        res.status(400).send("Missing Credentials");
    } else {
        const salt = await bcrypt.genSalt();
        const clientHash = await bcrypt.hash(clientSecret, salt);

        addUpdateApiClient(clientId, clientHash, (result) => {
            res.send("Success");
        });
    }
});

module.exports = router;
