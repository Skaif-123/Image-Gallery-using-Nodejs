import { Router } from "express";
import { extractImageByIdController, extractImageController, uploadImageController } from "../controllers/ImageControllers.js";
import { uploadMiddleware } from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/images", uploadMiddleware.array("photo",20), uploadImageController);
router.get("/getImages",extractImageController);
router.get("/getImages/:id",extractImageByIdController);

export { router };
