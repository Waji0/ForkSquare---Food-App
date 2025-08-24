import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
// import { Multer } from "multer";
import {removeImageFromCloudinary, uploadImageOnCloudinary} from "../utils/cloudinaryServices";
import { Order } from "../models/order.model";
import { Menu } from "../models/menu.model";


export const createRestaurant = async (req: Request, res: Response) => {

    try {

        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const { secure_url, public_id } = await uploadImageOnCloudinary(file as Express.Multer.File);

        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            // imageUrl,
            imageUrl: secure_url,
            imageId: public_id,
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

};


export const getRestaurant = async (req: Request, res: Response) => {

    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant:[],
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({ success: true, restaurant });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


// export const updateRestaurant = async (req: Request, res: Response) => {

//     try {
//         const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
//         const file = req.file;
//         const restaurant = await Restaurant.findOne({ user: req.id });

//         if (!restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Restaurant not found"
//             });
//         }

//         restaurant.restaurantName = restaurantName;
//         restaurant.city = city;
//         restaurant.country = country;
//         restaurant.deliveryTime = deliveryTime;
//         restaurant.cuisines = JSON.parse(cuisines);

//         if (file) {
//             const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
//             restaurant.imageUrl = imageUrl;
//         }

//         await restaurant.save();

//         return res.status(200).json({
//             success: true,
//             message: "Restaurant updated",
//             restaurant
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// };

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Updating text fields if exist
    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    // Handle image replacement
    if (file) {
      
      if (restaurant.imageId) { // Deleting old image if exist
        try {
          await removeImageFromCloudinary(restaurant.imageId);
        } catch (err) {
          console.error("Error deleting old restaurant image:", err);
        }
      }

      // Uploading new image
      const { secure_url, public_id } = await uploadImageOnCloudinary(file as Express.Multer.File);

      // Saving new image Data in DB 
      restaurant.imageUrl = secure_url;
      restaurant.imageId = public_id;
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant updated",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getRestaurantOrder = async (req: Request, res: Response) => {

    try {
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export const updateOrderStatus = async (req: Request, res: Response) => {

    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            success: true,
            status:order.status,
            message: "Status updated"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export const searchRestaurant = async (req: Request, res: Response) => {

    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
        const query: any = {};
        // basic search based on searchText (name ,city, country)
        console.log(selectedCuisines);
        
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }

        // filter on the basis of searchQuery
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }

        // console.log(query);
        // ["momos", "burger"]
        if(selectedCuisines.length > 0) {
            query.cuisines = {$in:selectedCuisines}
        }
        
        const restaurants = await Restaurant.find(query);

        return res.status(200).json({
            success:true,
            data:restaurants
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export const getSingleRestaurant = async (req:Request, res:Response) => {

    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path:'menus',
            options:{createdAt:-1}
        });

        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            });
        }

        return res.status(200).json({success:true, restaurant});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate("menus");

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Deleting restaurant's image from Cloudinary
    if (restaurant.imageId) {
      try {
        await removeImageFromCloudinary(restaurant.imageId);
      } catch (err) {
        console.error("Error deleting restaurant image:", err);
      }
    }

    // Deleting all menu images from Cloudinary
    for (const menu of restaurant.menus as any[]) { // as any[]
      if (menu.imageId) {
        try {
          await removeImageFromCloudinary(menu.imageId);
        } catch (err) {
          console.error(`Error deleting menu image (${menu._id}):`, err);
        }
      }
    }

    // Deleting all menus linked to this restaurant
    await Menu.deleteMany({ _id: { $in: restaurant.menus } });

    // Deleting restaurant itself
    await Restaurant.findByIdAndDelete(restaurant._id);

    return res.status(200).json({
      success: true,
      message: "Restaurant and all associated menus deleted",
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find().populate("menus");

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found",
        restaurants: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Error fetching all restaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
