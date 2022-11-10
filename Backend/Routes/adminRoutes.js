const express = require('express');
const { alluser, blockUser, UnblockUser, edituser, userdetails } = require('../controller/adminController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})

router.get("/get-users", alluser)
router.get("/single-user", userdetails)
router.post("/blockUser", blockUser)
router.post("/unblockUser", UnblockUser)
router.post("/edit-user", edituser)

module.exports = router

