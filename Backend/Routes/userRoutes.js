const express = require('express');
const { registerUser, authUser,alluser } = require('../controller/userController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})

router.post("/signup", registerUser)
router.post("/login", authUser )

// router.get("/get-users", alluser )
module.exports = router

