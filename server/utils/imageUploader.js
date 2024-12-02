const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

const getTransformationOptions = (resolution) => {
  switch (resolution) {
    case "1080p":
      return { width: 1920, height: 1080, crop: "scale" };
    case "720p":
      return { width: 1280, height: 720, crop: "scale" };
    case "480p":
      return { width: 854, height: 480, crop: "scale" };
    case "360p":
      return { width: 640, height: 360, crop: "scale" };
    default:
      return {};
  }
};

exports.uploadVideoToCloudinary = async (file, folder) => {
  const resolutions = ["1080p", "720p", "480p", "360p"];
  const videoUrls = {};

  for (let resolution of resolutions) {
    const transformationOptions = getTransformationOptions(resolution);
    const options = {
      folder,
      resource_type: "video",
      transformation: transformationOptions,
    };

    try {
      console.log(`Uploading ${resolution} video...`);
      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        options
      );

      if (result && result.secure_url) {
        console.log(`Uploaded ${resolution} video:`, result.secure_url);
        videoUrls[resolution] = result.secure_url;
      } else {
        console.error(`Failed to retrieve secure_url for ${resolution} video`);
        videoUrls[resolution] = undefined;
      }
    } catch (error) {
      console.error(`Error uploading ${resolution} video:`, error.message);
      videoUrls[resolution] = undefined;
    }
  }

  return videoUrls;
};
