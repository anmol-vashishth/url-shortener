const express = require("express")
const router = express.Router()
const { handleShortURL } = require("../controllers/shortID")

router.get("/:shortID", handleShortURL)

module.exports = router