const express = require('express');
const {  alluser, blockUser, UnblockUser } = require('../controller/adminController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})


router.get("/get-users", alluser)
router.post("/blockUser", blockUser)
router.post("/unblockUser", UnblockUser)

module.exports = router

