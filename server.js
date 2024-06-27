const express = require('express')
const mongoose = require("./src/connection/dbconnector")
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require("./src/app")


const server = express();
const port = 1000;
server.use(cors("*"));

server.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) => {
    console.log("URL :" + req.headers.host + req.url)
    console.log("body :", req.body)
    console.log("param :", req.params)
    console.log("query :", req.query)
    console.log("header :", req.headers)
    next();
})

server.use(app);

server.listen(port, (err) => {
    if (err) console.log("error in server connection", err)
    else console.log(`server is listin on port:${port}`)
})