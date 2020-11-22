/**
 *  DB calls for raw data
 *
 *  Robin Branders
 */
const format = require("pg-format");
const { pool } = require("./db");

const rawData = async (data, callback) => {
    const rows = data.map((e) => {
        return [
            e.sensor_id,
            e.edge_time,
            new Date(),
            JSON.stringify({ value: e.value })
        ];
    });

    try {
        const result = await pool.query(
            format(
                `insert into raw_data (sensor_id, edge_time, entry_on, data) values %L`,
                rows
            )
        );

        if (typeof callback === "function") callback(result, null);
    } catch (e) {
        if (typeof callback === "function") callback(null, e);
    }
};

module.exports = { rawData };
