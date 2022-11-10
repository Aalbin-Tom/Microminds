const express = require('express');
const { alluser, blockUser, UnblockUser, edituser, userdetails, deleteuser } = require('../controller/adminController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})

router.get("/get-users", alluser)
router.get("/single-user/:id", userdetails)
router.post("/blockUser", blockUser)
router.post("/unblockUser", UnblockUser)
router.post("/edit-user", edituser)
router.post("/delete-user", deleteuser)
module.exports = router

