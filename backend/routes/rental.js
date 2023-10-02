const express = require("express")
const controllerRental = require("../controllers/rental")
const router = express.Router()


router.post("/post", controllerRental.addREntal)


module.exports = router;