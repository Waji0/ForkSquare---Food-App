import cloudinary from "./cloudinary";



export interface CloudinaryImage {
  secure_url: string;
  public_id: string;
}



export const uploadImageOnCloudinary = async (
  file: Express.Multer.File
): Promise<CloudinaryImage> => {
  try {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    return {
      secure_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};


export const removeImageFromCloudinary = async (
  public_id: string
): Promise<{ result: string }> => {
  try {
    const deleteResponse = await cloudinary.uploader.destroy(public_id);
    return deleteResponse;
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
