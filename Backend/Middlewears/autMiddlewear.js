const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/loginModel')


const protect = asyncHandler(async (req, res, next) => {
    let token


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from  header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from with same id 
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('No Token Generated')
    }

})


module.exports = { protect }

// module.exports = {
//     Verify: asyncHandler((req, res, next) => {
//         const token = req.headers['token'];
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 throw new Error('session Expired')
//             } else {
//                 next();
//             }
//         });

//     })
// }