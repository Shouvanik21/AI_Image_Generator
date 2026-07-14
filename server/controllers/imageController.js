const { v4: uuidv4 } = require("uuid");
const imageModel = require("../models/Image");
const CryptoJS = require("crypto-js");

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

const generateImage = (req, res) => {
  try {
    const { prompt, model } = req.body;

    const visitorId = req.cookies.visitorId_cookie;

    console.log(prompt);

    console.log(model);

    console.log(visitorId);

    res.status(200).json({
      message: "Generate API Working",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      messaage: "Error generating image",
    });
  }
};

const encryptImageUrl=(imageUrl)=>{
  return CryptoJS.AES.encrypt(imageUrl,process.env.AES_SECRET_KEY).toString()
}

const decryptImageUrl=(encryptedimageUrl)=>{
  return CryptoJS.AES.decrypt(encryptedimageUrl,process.env.AES_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

module.exports = { home,generateImage };
