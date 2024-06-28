const UsersService = require("../../service/userService")

async function deletectrl(req, res, next) {
    try {
        const userService = new UsersService()
        const id = req.params;
        console.log(":::::s", id.uid)
        const userData = await userService.deleteUser(id)
        return res.send(userData)
    } catch (error) {
        if (error.message) return res.status(400).send({message : error.message})
        return res.status(500).send("internal server error")
    }
}

module.exports = deletectrl