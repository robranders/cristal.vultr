const express = require("express");
const app = express();

app.get("/about", (req, res) => {
    res.send("Hello world !");
});

app.listen(80, () => {
    console.log("Server running on port 80");
})