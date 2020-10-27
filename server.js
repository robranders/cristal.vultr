// ENV
const PORT = process.env.CRISTAL_PORT;

// Express server
const express = require("express");
const app = express();

// Post middleware
var bodyParser = require("body-parser");

// DB connections
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.CRISTAL_DB_USER,
  host: process.env.CRISTAL_DB_HOST,
  database: process.env.CRISTAL_DB_DB,
  password: process.env.CRISTAL_DB_PWD,
  port: process.env.CRISTAL_DB_PORT
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Cristal Express server");
});

app.get("/sql/lastrecords", (req, response) => {
  pool.query(
    "select * from raw_data order by id desc limit 100;",
    (err, res) => {
      if (err) return response.status(500).json({ err });
      return response.json(res.rows);
    }
  );
});

app.post("/sql/record", (req, res) => {
  try {
    const { body } = req;
    const { record } = body;
    const { sensorId, value, timestamp } = record;
    if (sensorId && value && timestamp) {
      pool.query(
        "insert into raw_data(sensor_id, value, sensor_timestamp) values($1, $2, $3);",
        [sensorId, value, timestamp],
        (err, resp) => {
          if (err) return res.status(401).json({ err });
          return res.json(resp.rows);
        }
      );
    } else {
      res.status(500).json({ msg: "bad values" });
    }
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
