import { uploadCloudinary } from "../helpers/cloudinaryHelpers.js";
import { ImageGallery } from "../models/imageModel.js";
export const uploadImageController = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "File is required.Please upload an image",
      });
    }
    const imagePromises = req.files.map(async (file) => {
      const result = (await uploadCloudinary(file.path)) || {};
      const {
        secure_url: secureUrl = "",
        original_filename: originalFilename = "",
        resource_type: resourceType = "",
        bytes: size = 0,
      } = result;
      return {
        imageURL: secureUrl,
        originalName: originalFilename,
        resourceType: resourceType,
        size: size,
      };
    });

    const images = await Promise.all(imagePromises);
    await ImageGallery.insertMany(images);
    // upload to cloudinary

    return res.status(201).json({
      success: true,
      message: "successfully added image to cloudinary",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export const extractImageController = async (req, res) => {
  try {
    const images = await ImageGallery.find();
    if (images) {
      res.status(200).json({
        success: true,
        message: "extracting all image data",
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const extractImageByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const imageById = await ImageGallery.findById(id);
    if (imageById) {
      res.status(200).json({
        success: true,
        message: "find image by id successfull",
        data: imageById,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
