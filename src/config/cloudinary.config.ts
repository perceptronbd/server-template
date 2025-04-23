import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

export const upload = multer({ dest: "uploads/" });

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
