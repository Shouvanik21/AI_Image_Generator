const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },

  prompt: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  encryptedImageUrl: {
    type: String,
    required: true,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageModel = mongoose.model("Image", ImageSchema);
module.exports = ImageModel;
