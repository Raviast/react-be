
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const config = require("../config/config")

class Utitlity {

    static getAuthtoken(uid) {
        const accessToken = jwt.sign({ uid }, config.jwt.accessToken.sercret, { expiresIn: config.jwt.accessToken.expiry })
        const refreshToken = jwt.sign({ uid }, config.jwt.refreshToken.sercret, { expiresIn: config.jwt.refreshToken.expiry })

        return {
            accessToken,
            refreshToken
        }
    }

    static userResponse(userData = {}) {
        const response = {
            uid: userData._id,
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            countryCode: userData.countryCode,
            authToken: this.getAuthtoken(userData._id)
        }

        return response;
    }

    
    static async getHashSalt(password, salt = '') {

        // Generate salt
        if (!salt) salt = await bcrypt.genSalt(10);
        // Generate hash
        const hash = await bcrypt.hash(password, salt);

        return { hash, salt }

    }

    static async checkpass(dbHash, passHash) {
        console.log(dbHash, passHash, await bcrypt.compare(dbHash, passHash))
        const isMatch = (dbHash === passHash);
        if (!isMatch) {
            throw { message: "Inavalid credentials" }
        }

        return true
    }
}


module.exports = Utitlity