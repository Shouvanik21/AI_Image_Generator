const express = require("express");

const router = express.Router();

const {
  home,
  generateImage,
  getImages,
  getRecentImages,
  deleteImage,
  favoriteImage,
  searchImages,
  enhancePromptOnly,
} = require("../controllers/imageController");

router.get("/", home);
router.post("/generateimage", generateImage);
router.get("/getimages", getImages);
router.get("/getrecentimages", getRecentImages);
router.delete("/deleteimage/:id", deleteImage);
router.patch("/favoriteimage/:id", favoriteImage);
router.get("/searchimages", searchImages);
router.post("/enhanceprompt", enhancePromptOnly);

module.exports = router;
