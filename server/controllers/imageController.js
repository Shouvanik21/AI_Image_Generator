const { v4: uuidv4 } = require("uuid");
const imageModel = require("../models/Image");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

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

    if (!visitorId) {
      return res.status(401).json({
        message: "Visitor ID not found",
      });
    }

    if (!prompt || !model) {
      return res.status(400).json({
        message: "Prompt and Model are required",
      });
    }

//     console.log("Prompt:", prompt);
// console.log("Model:", model);
    const response = await axios.post(
  "https://image.pollinations.ai/openai/v1/images/generations",
  {
    model: "flux",
    prompt: "A cute cat",
    size: "1024x1024",
    n: 1,
  },
  {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
// console.log(response.headers["content-type"]);
    const imageBuffer = Buffer.from(response.data);
    // console.log("Image size:", imageBuffer.length);

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "AI-Image-Studio",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(imageBuffer).pipe(uploadStream);
    });

    // console.log(cloudinaryResponse);

    const imageUrl = cloudinaryResponse.secure_url;
    const encryptedImageUrl = encryptImageUrl(imageUrl);
    const image = new imageModel({
      visitorId,
      model,
      encryptedImageUrl,
    });

    await image.save();

    res.status(200).json({
      success:true,
      message: "Image Generated Successfully",
      imageUrl
    });
  } catch (err) {
    console.log(err.response?.status);
  console.log(err.response?.data);
  console.log(err.message);

    res.status(500).json({
      messaage: "Error generating image",
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
