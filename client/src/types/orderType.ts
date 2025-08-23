import type { CartItem } from "./cartType";


// export type CheckoutSessionRequest = {

//     cartItems:{
//         // menuId: string;
//         _id: string;
//         name:string;
//         imageUrl:string;
//         // price:string;
//         // quantity:string;
//         price:number;
//         quantity:number;
//     }[];

//     deliveryDetails:{
//         name:string;
//         email:string;
//         // contact:string;
//         address:string;
//         city:string;
//         country:string;
//         // totalAmount: number;
//     },

//     restaurantId:string;
// };

// export type MenuItem = {
//     _id: string;
//     // menuId: string;
//     name: string;
//     description?: string;
//     price: number;
//     imageUrl: string; //image:
// };

// export interface CartItem extends MenuItem { 
//     quantity: number;
// };

// type CartItem = {
//       menuId: string;   // actual DB menu item _id
//       name: string;
//       imageUrl: string;
//       price: number;
//       quantity: number;
//     }[];

// <---------------------------------------After Deploy----------------------------------------------->


export type RCSRType = {
    restaurantId: string;
    cartItems: CartItem[];
  };

export type DDCSRType = {
    email: string;
    name: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };  

// RestaurantCheckoutSessionRequest = RCSRType
// deliveryDetailsCheckoutSessionRequest = DDCSRType 

export type CheckoutSessionRequest = {

  restaurants: RCSRType[];
  deliveryDetails: DDCSRType;
  
};



export interface Orders extends CheckoutSessionRequest {
    _id: string;
    // status: string;
    status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
    totalAmount: number;
};


export type OrderState = {
    loading: boolean;
    orders: Orders[];
    createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;
};