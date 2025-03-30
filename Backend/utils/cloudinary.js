import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "karangaliya",
  api_key: process.env.CLOUDINARY_API_KEY || "713926982637539",
  api_secret: process.env.CLOUDINARY_API_SECRET || "SX_-8N-2PcZfykDJenMhtpaej0I",
});

// Valid file types and their corresponding resource types
const VALID_FILE_TYPES = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  video: ['mp4', 'mov', 'avi', 'mkv'],
  raw: ['pdf', 'doc', 'docx', 'txt', 'csv']
};

const uploadOnCloudinary = async (localFilePath, resourceType = 'auto', folder = 'uploads') => {
  try {
    // Validate inputs
    if (!localFilePath) {
      throw new Error('Local file path is required');
    }

    if (!fs.existsSync(localFilePath)) {
      throw new Error('File does not exist at the specified path');
    }

    // Determine file extension and validate against resource type
    const fileExt = path.extname(localFilePath).toLowerCase().slice(1);
    let validatedResourceType = resourceType;

    if (resourceType === 'auto') {
      // Auto-detect resource type based on file extension
      if (VALID_FILE_TYPES.image.includes(fileExt)) {
        validatedResourceType = 'image';
      } else if (VALID_FILE_TYPES.video.includes(fileExt)) {
        validatedResourceType = 'video';
      } else if (VALID_FILE_TYPES.raw.includes(fileExt)) {
        validatedResourceType = 'raw';
      } else {
        throw new Error(`Unsupported file type: ${fileExt}`);
      }
    } else {
      // Validate against specified resource type
      if (!VALID_FILE_TYPES[resourceType]?.includes(fileExt)) {
        throw new Error(`File extension ${fileExt} is not valid for resource type ${resourceType}`);
      }
    }

    // Prepare upload options
    const uploadOptions = {
      resource_type: validatedResourceType,
      use_filename: true,
      unique_filename: false,
      folder,
      overwrite: true,
      transformation: validatedResourceType === 'image' ? [{ quality: 'auto' }] : undefined
    };

    console.log(`Uploading ${validatedResourceType} file: ${localFilePath}`);

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, uploadOptions);

    // Clean up local file
    try {
      fs.unlinkSync(localFilePath);
      console.log(`Local file cleaned up: ${localFilePath}`);
    } catch (cleanupError) {
      console.error('Error cleaning up local file:', cleanupError);
    }

    return {
      success: true,
      message: 'File uploaded successfully',
      data: {
        public_id: response.public_id,
        secure_url: response.secure_url,
        format: response.format,
        resource_type: response.resource_type,
        bytes: response.bytes,
        created_at: response.created_at
      }
    };
  } catch (error) {
    console.error('Error in uploadOnCloudinary:', error.message);

    // Attempt to clean up local file even if upload failed
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (cleanupError) {
        console.error('Error cleaning up local file after failed upload:', cleanupError);
      }
    }

    return {
      success: false,
      message: error.message || 'File upload failed',
      error: error.toString()
    };
  }
};

const deleteImage = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required');
    }

    if (!['image', 'video', 'raw'].includes(resourceType)) {
      throw new Error('Invalid resource type');
    }

    console.log(`Deleting ${resourceType} with public ID: ${publicId}`);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    if (result.result !== 'ok') {
      throw new Error(`Failed to delete: ${result.result}`);
    }

    return {
      success: true,
      message: 'File deleted successfully',
      data: result
    };
  } catch (error) {
    console.error('Error in deleteImage:', error.message);
    return {
      success: false,
      message: error.message || 'File deletion failed',
      error: error.toString()
    };
  }
};

const getResourceDetails = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required');
    }

    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType
    });

    return {
      success: true,
      message: 'Resource details retrieved',
      data: result
    };
  } catch (error) {
    console.error('Error in getResourceDetails:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to get resource details',
      error: error.toString()
    };
  }
};

export { uploadOnCloudinary, deleteImage, getResourceDetails };