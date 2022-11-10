const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const generateToken = require('../jwtjson');
const UserDetail = require('../Models/userDetailsModel');



const alluser = asyncHandler(async (req, res) => {
    const users = await User.aggregate([
        {
            $match: {value:"user" }
        },
        {
            $lookup: {
                from: 'userdetails',
                localField: '_id',
                foreignField: 'userId',
                as: 'users'
            }
        }
    ])
    if (users) {
        res.json({
            users
        })
    } else {
        throw new Error('No data in db ')
    }
})

const blockUser = asyncHandler(async (req, res) => {

    const { _id } = req.body;
    console.log(req.body);

    let user = await User.findOne({ _id: _id });

    if (user) {
        let success = await User.updateOne(
            { _id: _id },
            {
                $set: { status: false },
            }
        );
        userdata = await User.findOne({ _id: _id });
        console.log(userdata);
        res.json({ user });
    } else {
        res.status(400);
        throw new Error("No users available");
    }
})

const UnblockUser = asyncHandler(async (req, res) => {
    console.log("unblockUser");
    const { _id } = req.body;
    console.log(req.body);

    let user = await User.findOne({ _id: _id });

    if (user) {
        let success = await User.updateOne(
            { _id: _id },
            {
                $set: { status: true },
            }
        );
        userdata = await User.findOne({ _id: _id });
        console.log(userdata);
        res.json({ userdata });
    } else {
        res.status(400);
        throw new Error("No users available");
    }
})


module.exports = { alluser ,blockUser ,UnblockUser}
