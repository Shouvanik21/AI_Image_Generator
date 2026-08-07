const { v4: uuidv4 } = require("uuid");
const imageModel = require("../models/Image");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");
const enhancePromptWithGroq = require("../utils/groqEnhancer");

const home = (req, res) => {
  try {
    let visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      visitorId = uuidv4();

      res.cookie("visitorId_cookie", visitorId, {
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
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
    const {
      prompt,
      model,
      aspectRatio,
      guidance,
      steps,
      enhancePrompt,
      stylePreset,
    } = req.body;

    console.log({
      prompt,
      model,
      aspectRatio,
      guidance,
      steps,
      enhancePrompt,
      stylePreset,
    });
    const visitorId = req.cookies.visitorId_cookie;

    // console.log("Prompt:", prompt);
    // console.log("Model:", model);
    // console.log("Visitor ID:", visitorId);

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

    let width = 1024;
    let height = 400;

    let imageData;
    let resizedBuffer;

    let previewWidth = 1728;
    let previewHeight = 806;

    switch (aspectRatio) {
      case "1:1":
        previewWidth = 806;
        previewHeight = 806;
        break;

      case "16:9":
        previewWidth = 1432;
        previewHeight = 806;
        break;

      case "9:16":
        previewWidth = 454;
        previewHeight = 806;
        break;

      case "4:3":
        previewWidth = 1074;
        previewHeight = 806;
        break;

      case "3:4":
        previewWidth = 604;
        previewHeight = 806;
        break;

      default:
        previewWidth = 1728;
        previewHeight = 806;
    }

    let finalPrompt = prompt;

    const stylePrompts = {
      none: "",

      photorealistic:
        "Ultra photorealistic, DSLR photography, highly detailed, natural lighting, 8k resolution, realistic textures, ",

      anime:
        "Anime style, vibrant colors, cel shading, Studio Ghibli inspired, masterpiece, ",

      fantasy:
        "Epic fantasy artwork, magical atmosphere, cinematic lighting, mystical environment, highly detailed concept art, ",
    };

    if (stylePreset !== "none") {
      finalPrompt = stylePrompts[stylePreset] + finalPrompt;
    }

    if (model === "@cf/black-forest-labs/flux-1-schnell") {
      // Flux Schnell returns JSON

      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
        {
          prompt: finalPrompt,
          width,
          height,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const base64Image = response.data.result.image;

      // Convert base64 -> Buffer
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Resize to preview size
      if (aspectRatio === "default") {
        resizedBuffer = await sharp(imageBuffer)
          .resize(previewWidth, previewHeight, {
            fit: "fill",
          })
          .png()
          .toBuffer();
      } else {
        resizedBuffer = await sharp(imageBuffer)
          .resize(previewWidth, previewHeight, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 1 },
          })
          .png()
          .toBuffer();
      }

      // Convert back to base64
      imageData = `data:image/png;base64,${resizedBuffer.toString("base64")}`;
    } else {
      // SDXL, DreamShaper, Lightning return binary image

      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
        {
          prompt: finalPrompt,
          width,
          height,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        },
      );

      const contentType = response.headers["content-type"];

      // Resize
      if (aspectRatio === "default") {
        resizedBuffer = await sharp(response.data)
          .resize(previewWidth, previewHeight, {
            fit: "fill",
          })
          .toBuffer();
      } else {
        resizedBuffer = await sharp(response.data)
          .resize(previewWidth, previewHeight, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 1 },
          })
          .toBuffer();
      }

      imageData = `data:${contentType};base64,${resizedBuffer.toString("base64")}`;
    }

    const uploadResult = await cloudinary.uploader.upload(imageData, {
      folder: "ImagineAI",
    });

    const encryptedImageUrl = encryptImageUrl(uploadResult.secure_url);

    const image = new imageModel({
      visitorId,
      prompt,
      model,
      encryptedImageUrl,
    });

    await image.save();

    res.status(200).json({
      success: true,
      image: uploadResult.secure_url,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    return res.status(500).json({
      success: false,
      message: "Error generating image",
    });
  }
};

const getImages = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    const images = await imageModel
      .find({ visitorId })
      .sort({ createdAt: -1 })
      .lean();

    const decryptedImages = images.map((img) => ({
      _id: img._id,
      model: img.model,
      prompt: img.prompt,
      image: decryptImageUrl(img.encryptedImageUrl),
      favorite: img.favorite,
      createdAt: img.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: decryptedImages.length,
      images: decryptedImages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching images",
    });
  }
};

const getRecentImages = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    const images = await imageModel
      .find({ visitorId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const decryptedImages = images.map((img) => ({
      _id: img._id,
      model: img.model,
      prompt: img.prompt,
      image: decryptImageUrl(img.encryptedImageUrl),
      createdAt: img.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: decryptedImages.length,
      images: decryptedImages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching images",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    const image = await imageModel.findOne({
      _id: req.params.id,
      visitorId,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const imageUrl = decryptImageUrl(image.encryptedImageUrl);

    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(500).json({
        success: false,
        message: "Failed to delete image from Cloudinary",
      });
    }

    await image.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting image",
    });
  }
};

const favoriteImage = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    const image = await imageModel.findOne({
      _id: req.params.id,
      visitorId,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    image.favorite = !image.favorite;

    await image.save();

    return res.status(200).json({
      success: true,
      message: image.favorite
        ? "Image added to favorites"
        : "Image removed from favorites",
      favorite: image.favorite,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating favorite",
    });
  }
};

const searchImages = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;
    const { query } = req.query;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const images = await imageModel
      .find({
        visitorId,
        prompt: {
          $regex: query,
          $options: "i",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    const decryptedImages = images.map((image) => ({
      _id: image._id,
      prompt: image.prompt,
      model: image.model,
      favorite: image.favorite,
      image: decryptImageUrl(image.encryptedImageUrl),
      createdAt: image.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: decryptedImages.length,
      images: decryptedImages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error searching images",
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

const enhancePromptOnly = async (req, res) => {
  try {
    const { prompt } = req.body;

    const enhanced = await enhancePromptWithGroq(prompt);

    return res.json({
      success: true,
      prompt: enhanced,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  home,
  generateImage,
  getImages,
  getRecentImages,
  deleteImage,
  favoriteImage,
  searchImages,
  enhancePromptOnly,
};
