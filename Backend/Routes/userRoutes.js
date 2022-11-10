const express = require('express');
const { registerUser, authUser, userdetails } = require('../controller/userController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})

router.post("/signup", registerUser)
router.post("/login", authUser )
router.post("/user-detail", userdetails)
module.exports = router

