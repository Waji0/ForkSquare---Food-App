// export type CheckoutSessionRequest = {

//     cartItems:{
//         menuId:string;
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
//         contact:string;
//         address:string;
//         city:string;
//         country:string;
//         // self addtion
//         totalAmount: number;
//     },

//     restaurantId:string;
// };

export type CheckoutSessionRequest = {

  cartItems: {
    menuId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  }[];

  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };

  restaurantId: string;

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