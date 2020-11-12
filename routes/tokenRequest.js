const {
    authApiClient,
    addUpdateApiClient
} = require("../db/Route_tokenRequest");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { getToken } = require("../oauth/generateAccessToken");
const { verifyRequestToken } = require("../oauth/verifyRequestToken");

router.use(verifyRequestToken);

router.post("/token", (req, res) => {
    const { clientId, clientSecret } = req;

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
                        const accessToken = getToken(clientId);

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
