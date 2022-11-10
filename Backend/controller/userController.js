const User = require('../models/userModel')
const asyncHandler = require("express-async-handler")
const generateToken = require('../jwtjson');



//sign up to 
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, age, value } = req.body;
    console.log(req.body);
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User allready Exists ")

    } else {
        const user = await User.create({
            name, email, password, value, age
        });
        if (user) {

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: "false",
                value: user.value,
                age: user.age,
            })
        } else {
            res.status(400)
            throw new Error("error")
        }
    }
    console.log(Error);
})




//login as user
const authUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    console.log(req.body);
    const user = await User.findOne({ name })

    if (user.status) {
        if (user && (await user.matchPassword(password))) {
            if (user.value == "user") {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: "false",
                    age: user.age,
                     token: generateToken(user._id)
                })
            } else {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: "true",
                    age: user.age,
                    token: generateToken(user._id)
                })
            }
            // res.json({
            //     _id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     isAdmin: "false",
            //     age:user.age,
            //     type: user.type,
            //     token: generateToken(user._id)
            // })
        } else {
            res.status(400)
            throw new Error("Invalid Email or Password")
        }
    } else {
        throw new Error(' ACCOUNT  IS  BLOCKED ')
    }

})



module.exports = { registerUser, authUser }
