const express = require("express");

const router = express.Router();

const { home, generateImage } = require("../controllers/imageController");

router.get("/", home);
router.post("/generate-image",generateImage)

module.exports = router;
