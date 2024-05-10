require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.createAccessToken = function (userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET)
}

