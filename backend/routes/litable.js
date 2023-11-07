const express = require("express")
const controllerLitable = require("../controllers/litable")
const router = express.Router()

router.get("/display", controllerLitable.displayLitable)

router.post("/post", controllerLitable.addLitable)

router.put("/update", controllerLitable.updateLitable)

router.delete("/delete", controllerLitable.deleteLitable)


module.exports = router; 