const UsersService = require("../../service/userService")

async function loginctrl(req, res, next) {
    try {
        const userService = new UsersService()
        const body = req.body;
        console.log(":::::s")
        const userData = await userService.login(body)
        return res.send(userData)
    } catch (error) {
        console.log(error);
        if (error.message) return res.status(400).send({message : error.message})
        return res.status(500).send("internal server error")
    }
}

module.exports = loginctrl