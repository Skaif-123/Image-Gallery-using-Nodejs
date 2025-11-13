import cloudinary from "../config/cloudinary.js";

export const uploadCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return result;
  } catch (error) {
    console.error("Error while uploading to cloudinary:", error);
    throw error; // Re-throw to handle in controller
  }
};
