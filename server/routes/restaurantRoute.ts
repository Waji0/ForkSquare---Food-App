import express from "express";
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controller/restaurantController";
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"), createRestaurant);
router.route("/").get(isAuthenticated, getRestaurant);
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateRestaurant); 
router.route("/").delete(isAuthenticated, deleteRestaurant);
router.route("/all").get(isAuthenticated, getAllRestaurants);
router.route("/order").get(isAuthenticated,  getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);
// router.get("/search/:searchText", isAuthenticated, searchRestaurant);
router.route("/:id").get(isAuthenticated, getSingleRestaurant); 

export default router;


