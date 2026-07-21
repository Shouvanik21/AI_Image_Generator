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
    const { prompt, model, aspectRatio } = req.body;
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
    let height = 1024;

    switch (aspectRatio) {
      case "16:9":
        width = 1280;
        height = 720;
        break;

      case "9:16":
        width = 720;
        height = 1280;
        break;

      case "4:3":
        width = 1024;
        height = 768;
        break;

      case "3:4":
        width = 768;
        height = 1024;
        break;

      default:
        width = 1024;
        height = 1024;
    }

    console.log("Selected model:", model);

    const axios = require("axios");

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const base64Image = response.data.result.image;

    const imageData = `data:image/jpeg;base64,${base64Image}`;

    const encryptedImageUrl = encryptImageUrl(imageData);

    const image = new imageModel({
      visitorId,
      prompt,
      model,
      encryptedImageUrl,
    });

    await image.save();

    res.status(200).json({
      success: true,
      image: imageData,
    });
  } catch (error) {
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

    const images = await imageModel.find({ visitorId }).sort({ createdAt: -1 });

    const decryptedImages = images.map((image) => ({
      _id: image._id,
      model: image.model,
      imageUrl: decryptImageUrl(image.encryptedImageUrl),
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
      message: "Error fetching images",
    });
  }
};

const getImage = async (req, res) => {
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

    return res.status(200).json({
      success: true,
      image: {
        _id: image._id,
        prompt: image.prompt,
        model: image.model,
        favorite: image.favorite,
        imageUrl: decryptImageUrl(image.encryptedImageUrl),
        createdAt: image.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching image",
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

    await imageModel.findByIdAndDelete(req.params.id);

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

const getFavoriteImages = async (req, res) => {
  try {
    const visitorId = req.cookies.visitorId_cookie;

    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID not found",
      });
    }

    const images = await imageModel
      .find({
        visitorId,
        favorite: true,
      })
      .sort({ createdAt: -1 });

    const decryptedImages = images.map((image) => ({
      _id: image._id,
      prompt: image.prompt,
      model: image.model,
      favorite: image.favorite,
      imageUrl: decryptImageUrl(image.encryptedImageUrl),
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
      message: "Error fetching favorite images",
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
      .sort({ createdAt: -1 });

    const decryptedImages = images.map((image) => ({
      _id: image._id,
      prompt: image.prompt,
      model: image.model,
      favorite: image.favorite,
      imageUrl: decryptImageUrl(image.encryptedImageUrl),
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

module.exports = {
  home,
  generateImage,
  getImages,
  deleteImage,
  favoriteImage,
  getFavoriteImages,
  getImage,
  searchImages,
};
