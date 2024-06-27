const jwt = require("jsonwebtoken");
const config = require("../../config/config");

async function accessTokenValidator(req, res, next) {
    try {
        const accessToken = req.headers.accesstoken;
        jwt.verify(accessToken, config.jwt.accessToken.sercret)

        const userPayload = jwt.decode(accessToken);
        if (userPayload.uid !== req.params.uid) return res.status(500).send('Invalid Acccess Token')
        next()
    } catch (error) {
        console.log("loging body data", error)
        return res.status(500).send('Invalid Acccess Token')
    }

}


module.exports = accessTokenValidator