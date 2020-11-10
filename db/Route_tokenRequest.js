/**
 * DB calls for the token request route
 * Robin Branders
 */

const { pool } = require("./db");

const addUpdateApiClient = async (clientId, clientHash, callback) => {
    const result = await pool.query(
        `
    INSERT INTO api_users (client_secret, client_id)
    VALUES($1, $2)
    ON CONFLICT (client_id)
    DO
    UPDATE 
    SET client_secret = EXCLUDED.client_secret;
    `,
        [clientHash, clientId]
    );

    if (typeof callback === "function") callback(result);
};

const authApiClient = async (clientIdCheck, callback) => {
    const { rows } = await pool.query(
        `
    SELECT client_id, client_secret
    FROM api_users
    WHERE client_id = $1`,
        [clientIdCheck]
    );
    try {
        if (rows.length > 0) {
            const { client_id, client_secret } = rows[0];
            if (client_id !== null && client_id !== undefined) {
                if (typeof callback === "function")
                    callback(
                        {
                            msg: "Success",
                            client_id,
                            clientHash: client_secret
                        },
                        null
                    );
            } else {
                if (typeof callback === "function")
                    callback(
                        {
                            msg: "Client Id not found"
                        },
                        null
                    );
            }
        } else {
            if (typeof callback === "function")
                callback(
                    {
                        msg: "Client Id not found"
                    },
                    null
                );
        }
    } catch (e) {
        if (typeof callback === "function") callback(null, e);
    }
};

module.exports = { addUpdateApiClient, authApiClient };
