const express = require('express');
const {  alluser } = require('../controller/adminController');
const router = express.Router()



router.get('/', (req, res) => {
    res.send("hello")
})


router.get("/get-users", alluser)

module.exports = router

