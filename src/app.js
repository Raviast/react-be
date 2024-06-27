const express = require('express')
const courseRoute = require("./routes/courseRoute")
const tokenRoutes = require("./routes/tokenRoutes");
const userRoutes = require('./routes/userRoutes');
const app = express();


app.use(userRoutes)
app.use(courseRoute)
app.use(tokenRoutes)

module.exports = app
