import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: "karangaliya",
    api_key: "713926982637539",
    api_secret: "SX_-8N-2PcZfykDJenMhtpaej0I",
});

// Upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath, fileType) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Auto-detect file type
            use_filename: true, // Keeps original filename
            unique_filename: false, // Prevents random renaming
            folder: "uploads", // Store in a specific folder (optional)
        });

        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.error("Error Uploading File:", error);

        // Ensure local file is deleted even if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return { success: false, message: "File upload failed", error };
    }
};

// Delete file from Cloudinary
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        return { success: false, message: "File deletion failed", error };
    }
};

export { uploadOnCloudinary, deleteImage };
