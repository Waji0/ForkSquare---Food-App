// import mongoose, { Document, Model } from "mongoose";

// type DeliveryDetails = {
//     email: string;
//     name: string;
//     address: string;
//     city: string;
// }

// export type CartItems = {
//     // menuId: string;
//     _id: string;
//     name: string;
//     imageUrl: string; //image:
//     price: number;
//     quantity: number;
// }

// export interface IOrder extends Document {
//     user: mongoose.Schema.Types.ObjectId;
//     restaurant: mongoose.Schema.Types.ObjectId;
//     deliveryDetails: DeliveryDetails,
//     cartItems: CartItems;
//     totalAmount: number;
//     status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
// }

// const orderSchema = new mongoose.Schema<IOrder>({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },

//     restaurant: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Restaurant',
//         required: true
//     },

//     deliveryDetails: {
//         email: {type:String, required:true},
//         name: {type:String, required:true},
//         address: {type:String, required:true},
//         city: {type:String, required:true},
//     },

//     cartItems: [
//         {
//             _id: {type:String, required:true},
//             name: {type:String, required:true},
//             imageUrl: {type:String, required:true}, //image:
//             price: {type:Number, required:true},
//             quantity: {type:Number, required:true},
//         }
//     ],

//     totalAmount: Number,

//     status: {
//         type: String,
//         enum: ["pending" , "confirmed" , "preparing" , "outfordelivery" , "delivered"],
//         required: true
//     }


// }, { timestamps: true });


// // export const Order = mongoose.model("Order", orderSchema);
// export const Order : Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);


// <------------------------------------------After Deploy------------------------------------------------------>

// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface ICartItem {
//   _id: mongoose.Schema.Types.ObjectId;
//   restaurantId: mongoose.Schema.Types.ObjectId;
//   name: string;
//   imageUrl: string;
//   price: number;
//   quantity: number;
// }

// export interface IRestaurantOrder {
//   restaurant: mongoose.Schema.Types.ObjectId;
//   cartItems: ICartItem[];
//   totalAmount: number; // total for this restaurant
// }

// export interface DeliveryDetails {
//   email: string;
//   name: string;
//   contact: string;
//   address: string;
//   city: string;
//   country: string;
// }

// export interface IOrder extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   restaurants: IRestaurantOrder[];
//   totalAmount: number; // total for entire order
//   deliveryDetails: DeliveryDetails;
//   status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
// }



// const cartItemSchema = new Schema<ICartItem>({
//   _id: { type: Schema.Types.ObjectId, required: true, ref: "Menu" },
//   restaurantId: { type: Schema.Types.ObjectId, required: true, ref: "Restaurant" },
//   name: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });

// const restaurantOrderSchema = new Schema<IRestaurantOrder>({
//   restaurant: { type: Schema.Types.ObjectId, required: true, ref: "Restaurant" },
//   cartItems: [cartItemSchema],
//   totalAmount: { type: Number, required: true },
// });

// const orderSchema = new Schema<IOrder>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     restaurants: [restaurantOrderSchema],
//     totalAmount: { type: Number, required: true }, // grand total
//     deliveryDetails: {
//       email: { type: String, required: true },
//       name: { type: String, required: true },
//       contact: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
//       required: true,
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);





import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  menuId: mongoose.Schema.Types.ObjectId;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface IRestaurantOrder {
  restaurant: mongoose.Schema.Types.ObjectId; // restaurantId
  cartItems: ICartItem[];
  totalAmount: number; // total for this restaurant
}

export interface DeliveryDetails {
  email: string;
  name: string;
  contact: string;
  address: string;
  city: string;
  country: string;
}

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurants: IRestaurantOrder[];
  totalAmount: number; // grand total
  deliveryDetails: DeliveryDetails;
  status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
}

// ------------------- Schemas -------------------

const cartItemSchema = new Schema<ICartItem>(
  {
    menuId: { type: Schema.Types.ObjectId, required: true, ref: "Menu" },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // ✅ avoid Mongo adding its own _id for each cartItem
);

const restaurantOrderSchema = new Schema<IRestaurantOrder>(
  {
    restaurant: { type: Schema.Types.ObjectId, required: true, ref: "Restaurant" },
    cartItems: [cartItemSchema],
    totalAmount: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurants: { type: [restaurantOrderSchema], required: true },
    totalAmount: { type: Number, required: true }, // grand total
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
