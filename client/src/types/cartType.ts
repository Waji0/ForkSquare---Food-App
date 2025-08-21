import type  { MenuItem }  from "./restaurantType";


export interface CartItem extends MenuItem { 
    quantity: number;
};


export type CartState = {
    cart: CartItem[];
    addToCart: (item:MenuItem) => void;
    clearCart: () => void;
    removeFromTheCart: (id:string) => void;
    incrementQuantity: (id:string) => void;
    decrementQuantity: (id:string) => void;
};


// export type CartState = {
//   cart: CartItem[];
//   cartTotal: number;
//   addToCart: (item: MenuItem) => void;
//   clearCart: () => void;
//   removeFromTheCart: (id: string) => void;
//   incrementQuantity: (id: string) => void;
//   decrementQuantity: (id: string) => void;
//   updateCartTotal: () => void; // 👈 helper for recalculating total
// };
