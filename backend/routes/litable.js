const express = require("express")
const controllerRental = require("../controllers/litable")
const router = express.Router()

router.get("/display", controllerRental.displayLitable)

router.post("/post", controllerRental.addLitable)

router.put("/update", controllerRental.updateLitable)

router.delete("/delete", controllerRental.deleteLitable)


module.exports = router;