const express = require('express')
const courceRoute = express();

courceRoute.get("/course/get/:ID", (req, res) => {
    console.log("get request for course", req.params.ID)
    res.send("get request for course" + req.params.ID)
})

module.exports = courceRoute