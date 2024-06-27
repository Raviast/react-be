const Joi = require("joi")
/**
 * 
 
404: NOT FOUND ( source not found)
400: bad request ( input not matchd with api )
500: internal server error 
200/2001: ok ( succesfull) bydefault
 */


function loginValidator(req, res, next) {
    try {
        const body = req.body;
        console.log(":::::::::::;dddd")
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().length(6).required(),

        })
        const { error, value } = schema.validate(body);

        if (error) {
            return res.status(400).send(error.message)
        }

        next()
    } catch (error) {
        console.log("loging body data", error)
        return res.status(500).send('internal server error')
    }


}


module.exports = loginValidator