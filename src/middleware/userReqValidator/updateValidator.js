const Joi = require("joi")
/**
 * 
 
404: NOT FOUND ( source not found)
400: bad request ( input not matchd with api )
500: internal server error 
200/2001: ok ( succesfull) bydefault
 */
// 24

function updateValidator(req, res, next) {
    try {
        //spread operator
        const body = { ...req.body, uid: req.params.uid, acccessToken: req.headers.acccessToken };
        console.log(":::::::::::;dddd", body)
        const schema = Joi.object({
            name: Joi.string().min(5).max(30).optional(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
            countryCode: Joi.string().length(3).optional(),
            phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
            uid: Joi.string().length(24).required(),
            acccessToken: Joi.string().required(),
        }).or("name", "email", "phoneNumber","countryCode")

        const { error, value } = schema.validate(body);

        if (error) {
            return res.status(400).send(error.message)
        }

        next()
    } catch (error) {
        console.log("Update Validator body data", error)
        return res.status(500).send('internal server error')
    }


}


module.exports = updateValidator