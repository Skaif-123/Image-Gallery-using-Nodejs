import mongoose from "mongoose";

const ImageGallerySchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
    },
    originalName: {
      type: String,
    },
    resourceType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ImageGallery = mongoose.model("images", ImageGallerySchema);
export { ImageGallery };
