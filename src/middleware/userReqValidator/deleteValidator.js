const Joi = require("joi")
/**
 * 
 
404: NOT FOUND ( source not found)
400: bad request ( input not matchd with api )
500: internal server error 
200/2001: ok ( succesfull) bydefault
 */
// 24

function deleteValidator(req, res, next) {
    try {
        const { uid } = req.params;
        const { accesstoken  } = req.headers
        console.log("hksdjfsdkfsdkdddd", uid)
        console.log(uid.length,  req.headers);

        const schema = Joi.object({
            uid: Joi.string().length(24).required(),
            accesstoken: Joi.string().required()
        })
        const { error, value } = schema.validate({ uid, accesstoken });

        if (error) {
            return res.status(400).send(error.message)
        }

        next()
    } catch (error) {
        console.log("invalid unique id", error)
        return res.status(500).send('internal server error')
    }


}


module.exports = deleteValidator