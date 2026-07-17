const { v4: uuidv4 } = require("uuid");
const imageModel = require("../models/Image");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const ai = require("../config/googleAI");

const home = (req, res) => {
  try {
    let visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      visitorId = uuidv4();

      res.cookie("visitorId_cookie", visitorId, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      console.log("New Visitor:", visitorId);
    } else {
      console.log("Returning Visitor:", visitorId);
    }

    res.status(200).json({
      message: "Welcome to AI Image Studio",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Error in generating UUID",
    });
  }
};

const generateImage = async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const visitorId = req.cookies.visitorId_cookie;

    if (!prompt || !model) {
      return res.status(400).json({
        message: "Prompt and model are required",
      });
    }

    if (!visitorId) {
      return res.status(400).json({
        message: "Visitor ID not found",
      });
    }

    // Generate a random seed so every request gets a different image
    const seed = Math.floor(Math.random() * 1000000000);

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?model=${model}&seed=${seed}&width=1024&height=1024&nologo=true`;

    const encryptedImageUrl = encryptImageUrl(imageUrl);

    const image = new imageModel({
      visitorId,
      model,
      encryptedImageUrl,
    });

    await image.save();

    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      imageUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error generating image",
    });
  }
};

const encryptImageUrl = (imageUrl) => {
  return CryptoJS.AES.encrypt(imageUrl, process.env.AES_SECRET_KEY).toString();
};

const decryptImageUrl = (encryptedimageUrl) => {
  return CryptoJS.AES.decrypt(
    encryptedimageUrl,
    process.env.AES_SECRET_KEY,
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = { home, generateImage };
