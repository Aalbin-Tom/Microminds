const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const generateToken = require('../jwtjson');
const UserDetail = require('../Models/userDetailsModel');
const { ObjectID, ObjectId } = require('bson');



const alluser = asyncHandler(async (req, res) => {
    const users = await User.aggregate([
        {
            $match: { value: { $ne: "admin" } }
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


const edituser=asyncHandler(async(req,res)=>{
    const { name, value, address1, address2, pincode, postoffice, gaurdianname,landmark, id } = req.body;
    console.log(req.body);
   const daa =await UserDetail.updateOne({ userId: id },
        {
            $set: {
                address1: address1,
                address2: address2,
                pincode: pincode,
                postoffice: postoffice,
                gaurdianname: gaurdianname,
                landmark: landmark
            }
        })
    await User.updateOne({ _id: id },
        {
            $set: {
                name: name,
                value: value,
               
            }
        })
})


const userdetails = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(req.params.id);
    const users = await User.aggregate([
        {
            $match: { _id:ObjectId(id)}
        },       
        {
            $lookup: {
                from: 'userdetails',
                localField: '_id',
                foreignField: 'userId',
                as: 'users'
            }
        },
    ])
    if (users) {
        res.json({
            users
        })
    } else {
        throw new Error('No data in db ')
    }
})



const deleteuser = asyncHandler(async (req, res) => {
    const { _id } = req.body
    console.log(_id);
    let users = await User.deleteOne({ _id: _id })
    res.json({ users })
})

module.exports = { alluser, blockUser, UnblockUser, edituser, userdetails ,deleteuser }
