const mongoose = require("mongoose")
const userSchema = require("./schema/userSchema")

const User = mongoose.model('User', userSchema);

class userDB {

    async getByID(id) {
        return await User.findById(id)
    }

    async getByEmail(email) {
        return await User.find({ email })
    }
    
    async getByQuery(query) {
        return await User.find(query)
    }

    async create(userData) {
        // return await User.create({
        //     name: "ravi",
        //     email: "ravi@gmail.com",
        //     phoneNumber: 8839974136,
        //     countryCode: "+91",
        //     password: {
        //         hash: "hdhdh",
        //         salt: "jwtToken"
        //     }
        // })

        return await User.create({ ...userData })
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, { ...userData }, {new : true});
    }

    async delete(id) {
        return await User.findOneAndDelete(id)
    }
}

module.exports = userDB