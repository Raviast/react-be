const express = require('express')
const userRoutes = express();
const loginValidator = require('../middleware/userReqValidator/loginValidator');
const loginctrl = require('../controller/userController/loginctrl');
const registerValidator = require('../middleware/userReqValidator/registerValidator');
const registerctrl = require('../controller/userController/registerctrl');
const requestValidator = require('../middleware/userReqValidator/requestValidator');
const updatValidator = require('../middleware/userReqValidator/updateValidator');
const requestctrl = require('../controller/userController/requestctrl');
const accessTokenValidator = require("../middleware/accesstoken/accessTokenValidator")
const deleteValidator = require('../middleware/userReqValidator/deleteValidator')
const deletectrl = require('../controller/userController/deletectrl')
const updatectrl = require('../controller/userController/updatectrl')

userRoutes.post("/user/login", loginValidator, loginctrl)

userRoutes.post("/user/register", registerValidator, registerctrl)

userRoutes.get("/user/get/:uid", requestValidator, accessTokenValidator, requestctrl)
userRoutes.put("/user/update/:uid", updatValidator, accessTokenValidator, updatectrl)
userRoutes.delete("/user/delete/:uid", deleteValidator,accessTokenValidator, deletectrl)

module.exports = userRoutes