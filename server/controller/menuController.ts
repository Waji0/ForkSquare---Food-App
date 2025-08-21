import { Request, Response } from "express";
import { removeImageFromCloudinary, uploadImageOnCloudinary } from "../utils/cloudinaryServices";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose, { ObjectId } from "mongoose";



export const addMenu = async (req:Request, res:Response) => {

    try {
      const { name, description, price } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      // Upload image to Cloudinary
      const { secure_url, public_id } = await uploadImageOnCloudinary(file as Express.Multer.File);

      // Save menu to DB
      const menu: any = new Menu({
        name,
        description,
        price,
        imageUrl: secure_url,
        imageId: public_id,
      });

      await menu.save();

      // Attach menu to restaurant
      const restaurant = await Restaurant.findOne({ user: req.id });
      if (restaurant) {
        (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
        await restaurant.save();
      }

      return res.status(201).json({
        success: true,
        message: "Menu added successfully",
        menu,
      });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"}); 
    }
};


export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
    }

    // Updating text fields if provided
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    // If a new image is uploaded
    if (file) {
      // Deleting old image from Cloudinary
      if (menu.imageId) {
        try {
          await removeImageFromCloudinary(menu.imageId);
        } catch (err) {
          console.error("Error deleting old image from Cloudinary:", err);
        }
      }

      // Uploading new image on Cloudinary
      const { secure_url, public_id } = await uploadImageOnCloudinary(file as Express.Multer.File);

      // Saving new Cloudinary data in DB
      menu.imageUrl = secure_url;
      menu.imageId = public_id;
    }

    // Saving updated menu
    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//self
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
    }

    // Deleting menu image from Cloudinary if exists
    if (menu.imageId) {
      try {
        await removeImageFromCloudinary(menu.imageId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    // Deleting menu from DB
    await Menu.findByIdAndDelete(id);

    // Removing reference from restaurant
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant) {
      restaurant.menus = restaurant.menus.filter(
        (menuId) => menuId.toString() !== id
      );
      await restaurant.save();
    }

    return res.status(200).json({
      success: true,
      message: "Menu deleted",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



