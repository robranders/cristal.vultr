/**
 *  DB calls for data management
 *
 *  Robin Branders
 */

const { pool } = require("./db");

const getSensorMap = async (callback) => {
    const result = await pool.query(
        `
        SELECT
            s.sensor_id,
            s.remote_id as "remote_sensor_id",
            d.remote_id as "remote_device_id",
            e.remote_id as "remote_edge_id"
        FROM sensors s 
        JOIN devices d on s.device_id = d.device_id
        JOIN edges e on d.edge_id = e.edge_id;

        `
    );
    try {
        const rows = result.rows;

        const sensorMap = {};
        if (Array.isArray(rows)) {
            rows.forEach((r) => {
                if (typeof sensorMap[r.remote_edge_id] === "undefined")
                    sensorMap[r.remote_edge_id] = {};

                if (
                    typeof sensorMap[r.remote_edge_id][
                        String(r.remote_device_id)
                    ] === "undefined"
                )
                    sensorMap[r.remote_edge_id][
                        String(r.remote_device_id)
                    ] = {};

                sensorMap[r.remote_edge_id][String(r.remote_device_id)][
                    String(r.remote_sensor_id)
                ] = r.sensor_id;
            });
        }

        if (typeof callback === "function") callback(sensorMap);
    } catch (e) {
        if (typeof callback === "function") callback(null, e);
    }
};

module.exports = { getSensorMap };
