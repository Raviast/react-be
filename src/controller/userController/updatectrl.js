const UsersService = require("../../service/userService")

async function updatectrl(req, res, next) {
    try {
        const userService = new UsersService()
        const body = req.body;
        console.log(":::::s", body)
        const userData = await userService.updateUser({...body,  uid: req.params.uid})
        return res.send(userData)
    } catch (error) {
        if (error.message) return res.status(400).send({message : error.message})
        return res.status(500).send("internal server error")
    }
}

module.exports = updatectrl