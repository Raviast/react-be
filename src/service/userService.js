const userDb = require('../database/userDb');
const Utitlity = require("../utility/util")

class UsersService {

    constructor() {
        this.userDb = new userDb()
    }


    async login(body) {
        try {
            const { email, password } = body
            const user = (await this.userDb.getByEmail(email))?.[0]

            if (!user || user.email !== email) throw ({ message: "user Not found" })
            const genratedHash = await Utitlity.getHashSalt(password, user.password.salt)

            await Utitlity.checkpass(user.password.hash, genratedHash.hash)

            const response = Utitlity.userResponse(user)

            return response;
        } catch (error) {
            throw error
        }
    }
    async registration(body) {
        try {
            const { email, password, name, phoneNumber, countryCode } = body
            const emailExist = (await this.userDb.getByEmail(email))?.[0]
            if (emailExist) throw ({ message: `This Email ${email} is already exists` })

            const phoneExist = (await this.userDb.getByQuery({ phoneNumber }))?.[0]
            if (phoneExist) throw ({ message: `This phone number ${phoneNumber} is already exists` })
            // const user = UserDb.getByEmail(email);


            const { hash, salt } = await Utitlity.getHashSalt(password)

            const user_data = {
                email,
                password: {
                    salt: salt,
                    hash: hash
                },
                name,
                phoneNumber,
                countryCode: countryCode
            }
            console.log(user_data);

            const user = await this.userDb.create(user_data);

            const response = Utitlity.userResponse(user)


            return response;
        }
        catch (error) {
            throw error
        }
    }

    async getUser(body) {
        try {
            const { uid } = body
            console.log("ravi:::", uid)
            const user = await this.userDb.getByID(uid)
            if (!user) throw ({ message: `user Not found` })

            const response = Utitlity.userResponse(user)

            return response;
        }
        catch (error) {
            throw error
        }
    }

    async updateUser(body) {
        try {
            const { email, password, name, phoneNumber, countryCode, uid, accessToken } = body;
            console.log("ravi:::", uid)
            const userExist = await this.userDb.getByID(uid)
            if (!userExist) throw ({ message: `user Not found` });

            const emailExist = (await this.userDb.getByEmail(email))?.[0]
            if (emailExist) throw ({ message: `This Email ${email} is already exists` })

            const phoneExist = (await this.userDb.getByQuery({ phoneNumber }))?.[0]
            if (phoneExist) throw ({ message: `This phone number ${phoneNumber} is already exists` })
            // const user = UserDb.getByEmail(email);


            const { hash, salt } = await this.getHashSalt(password)

            const user_data = {
                email,
                password: {
                    salt: salt,
                    hash: hash
                },
                name,
                phoneNumber,
                countryCode: countryCode
            }
            console.log(user_data);

            const user = await this.userDb.update(uid, user_data);

            const response = Utitlity.userResponse(user)

            return response;
        }
        catch (error) {
            throw error
        }
    }

    async deleteUser(body) {
        try {
            const { uid } = body
            console.log("ravi:::", uid)
            const user = await this.userDb.getByID(uid)
            if (!user) throw ({ message: `user Not found` });

            const user_data = await this.userDb.delete(uid);
            
            const response = Utitlity.userResponse(user_data)
            return response;
        }
        catch (error) {
            throw error
        }
    }
}


module.exports = UsersService