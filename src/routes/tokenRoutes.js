const express = require('express')
const tokenRoutes = express();

tokenRoutes.get("/token/get/:ID", (req, res) => {
    console.log("get request", req.params.ID)
    res.send("get request for course token" + req.params.ID)
})

module.exports = tokenRoutes