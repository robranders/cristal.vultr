/**
 *  Route to store sensor data
 *
 *  Robin Branders
 */

const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../oauth/verifyAccessToken");

// Sensor configuration
const { getSensorMap } = require("../db/dataManagement");
let sensorMap;

// Store sensor data
const { rawData } = require("../db/sensorData");

// Read sensor map
getSensorMap((result, err) => {
    if (err) return console.log(`Error getting sensor map: ${err.message}`);
    sensorMap = { ...result };
    console.log(sensorMap);
});

router.use(verifyAccessToken);

router.post("/rawdata", (req, res) => {
    try {
        const { body } = req;
        const data = body.data;
        const requestId = body.requestId;

        if (requestId === undefined || requestId === null)
            return res.status(400).json({ err: "no requestId" });

        if (Array.isArray(data)) {
            const insertData = data.map((entry, index) => {
                try {
                    // Try and map incomming entry
                    return {
                        sensor_id:
                            sensorMap[entry.s[0]][entry.s[1]][entry.s[2]],
                        edge_time: entry.t,
                        value: entry.v
                    };
                } catch (i_e) {
                    return {
                        err: i_e.stack,
                        s: entry.s,
                        v: entry.v
                    };
                }
            });

            rawData(insertData, (result) => {
                console.log(result);
            });
        } else {
            res.status(400).json({ err: "data not an array" });
        }
    } catch (e) {
        console.log(`[sensorData.rawdata] ${e.message} at ${e.stack}`);
        res.status(500).json({
            err: e.stack
        });
    }

    res.json({ status: "ok" });
});

module.exports = router;
