const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const generateToken = require('../jwtjson');

const alluser = asyncHandler(async (req, res) => {
    const users = await User.find({value:"user"})
    // console.log(users);
    if (users) {
        res.json({
            users
        })
    } else {
        throw new Error('No data in db ')
    }
})


module.exports = { alluser }
