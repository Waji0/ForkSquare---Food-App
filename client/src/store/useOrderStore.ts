// import type { CheckoutSessionRequest, OrderState } from "../types/orderType";
// import axios from "axios";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { useCartStore } from "./useCartStore";


// const API_END_POINT = "https://forksquare-server.vercel.app/api/v1/order";
// // const API_END_POINT = "http://localhost:3000/api/v1/order";
// axios.defaults.withCredentials = true;

// export const useOrderStore = create<OrderState>()(persist((set => ({

//     loading: false,
//     orders: [],

    // createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true,
    //         });

    //         // clear Cart after Checkout // Self
    //         // console.log("Successfully Checkout now clearing cart");
    //         useCartStore.getState().clearCart();

    //         window.location.href = response.data.session.url;
    //         set({ loading: false });
    //     } catch (error) {
    //         set({ loading: false });
    //     }
    // },

//     getOrderDetails: async () => {
//         try {
//             set({loading:true});
//             const response = await axios.get(`${API_END_POINT}/`, {
//                 withCredentials: true,
//             });
//             set({loading:false, orders:response.data.orders});
//         } catch (error) {
//             set({loading:false});
//         }
//     }
    
// })), {
//     name: 'order-name',
//     storage: createJSONStorage(() => localStorage)
// }));


// export const useOrderStore = create<OrderState>()(
//   persist(
//     (set) => ({
//       loading: false,
//       orders: [],

      // createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
      //   try {
      //     set({ loading: true });

      //     // ---------------- Validation ----------------
      //     const validCartItems = checkoutSession.cartItems.filter(
      //       (item) => item.menuId && Number(item.price) > 0 && Number(item.quantity) > 0
      //     );

      //     if (validCartItems.length === 0) {
      //       set({ loading: false });
      //       alert("Your cart is empty or contains invalid items.");
      //       return;
      //     }

      //     const validatedCheckoutSession: CheckoutSessionRequest = {
      //       ...checkoutSession,
      //       cartItems: validCartItems,
      //     };

      //     const response = await axios.post(
      //       `${API_END_POINT}/checkout/create-checkout-session`,
      //       validatedCheckoutSession,
      //       {
      //         headers: { "Content-Type": "application/json" },
      //         withCredentials: true,
      //       }
      //     );

      //     // Clear Cart after successful checkout
      //     useCartStore.getState().clearCart();

      //     window.location.href = response.data.session.url;
      //     set({ loading: false });
      //   } catch (error: any) {
      //     console.error("Checkout error:", error);
      //     set({ loading: false });
      //     alert(error.response?.data?.message || "Failed to create checkout session");
      //   }
      // },

//       getOrderDetails: async () => {
//         try {
//           set({ loading: true });
//           const response = await axios.get(`${API_END_POINT}/`, {
//             withCredentials: true,
//           });
//           set({ loading: false, orders: response.data.orders });
//         } catch (error) {
//           console.error(error);
//           set({ loading: false });
//         }
//       },
//     }),
//     {
//       name: "order-name",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );


// const API_END_POINT = "https://forksquare-server.vercel.app/api/v1/order";
// axios.defaults.withCredentials = true;

// export const useOrderStore = create<OrderState>()(
//   persist(
//     (set) => ({
//       loading: false,
//       orders: [],

      // createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
      //   try {
      //     set({ loading: true });

      //     // ---------------- Filter valid cart items ----------------
      //     const validCartItems = checkoutSession.cartItems
      //       .filter(
      //         (item) =>
      //           item.menuId &&
      //           Number(item.price) > 0 &&
      //           Number(item.quantity) > 0
      //       )
      //       .map((item) => ({
      //         menuId: item.menuId,
      //         name: item.name,
      //         price: item.price,
      //         quantity: item.quantity,
      //         image: item.image || undefined, // ✅ send undefined if no image
      //       }));

      //     if (validCartItems.length === 0) {
      //       set({ loading: false });
      //       alert("Your cart is empty or contains invalid items.");
      //       return;
      //     }

      //     const validatedCheckoutSession: CheckoutSessionRequest = {
      //       ...checkoutSession,
      //       cartItems: validCartItems,
      //     };

      //     // ---------------- Send to backend ----------------
      //     const response = await axios.post(
      //       `${API_END_POINT}/checkout/create-checkout-session`,
      //       validatedCheckoutSession,
      //       {
      //         headers: { "Content-Type": "application/json" },
      //         withCredentials: true,
      //       }
      //     );

      //     // ---------------- Clear cart ----------------
      //     useCartStore.getState().clearCart();

      //     // ---------------- Redirect to Stripe ----------------
      //     window.location.href = response.data.session.url;
      //     set({ loading: false });
      //   } catch (error: any) {
      //     console.error("Checkout error:", error);
      //     set({ loading: false });
      //     alert(error.response?.data?.message || "Failed to create checkout session");
      //   }
      // },

//       getOrderDetails: async () => {
//         try {
//           set({ loading: true });
//           const response = await axios.get(`${API_END_POINT}/`, { withCredentials: true });
//           set({ loading: false, orders: response.data.orders });
//         } catch (error) {
//           console.error(error);
//           set({ loading: false });
//         }
//       },
//     }),
//     {
//       name: "order-name",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );


import type { CheckoutSessionRequest, OrderState } from "../types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

const API_END_POINT = "https://forksquare-server.vercel.app/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],

      //   createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
      //     try {
      //       set({ loading: true });

      //       // 1️⃣ Validate and convert cart items
      //       const validCartItems = checkoutSession.cartItems
      //         .filter(
      //           (item) =>
      //             item.menuId &&
      //             Number(item.price) > 0 &&
      //             Number(item.quantity) > 0
      //         )
      //         .map((item) => ({
      //           menuId: item.menuId,
      //           name: item.name,
      //           price: Number(item.price),       // ✅ Convert to number
      //           quantity: Number(item.quantity), // ✅ Convert to number
      //           image: item.image || "https://example.com/placeholder.png", // ✅ Use `image` (matches backend)
      //         }));

      //       if (validCartItems.length === 0) {
      //         set({ loading: false });
      //         alert("Your cart is empty or contains invalid items.");
      //         return;
      //       }

      //       // 2️⃣ Build validated payload
      //       const validatedCheckoutSession: CheckoutSessionRequest = {
      //         ...checkoutSession,
      //         cartItems: validCartItems,
      //       };

      //       // 3️⃣ Send to backend
      //       const response = await axios.post(
      //         `${API_END_POINT}/checkout/create-checkout-session`,
      //         validatedCheckoutSession,
      //         {
      //           headers: { "Content-Type": "application/json" },
      //           withCredentials: true,
      //         }
      //       );

      //       // 4️⃣ Clear cart
      //       useCartStore.getState().clearCart();

      //       // 5️⃣ Redirect to Stripe
      //       window.location.href = response.data.session.url;
      //       set({ loading: false });
      //     } catch (error: any) {
      //       console.error("Checkout error:", error);
      //       set({ loading: false });
      //       alert(error.response?.data?.message || "Failed to create checkout session");
      //     }
      //   },

      // createCheckoutSession: async (
      //   checkoutSession: CheckoutSessionRequest
      // ) => {
      //   try {
      //     set({ loading: true });

      //     // ✅ Enrich & validate cart items
      //     const enrichedCartItems = checkoutSession.cartItems
      //       .map((item) => {
      //         if (!item) return null; // handle possible null

      //         return {
      //           menuId: item.menuId,
      //           name: item.name,
      //           price: Number(item.price), // convert to number
      //           quantity: Number(item.quantity), // convert to number
      //           imageUrl: item.imageUrl || "https://example.com/placeholder.png", // fallback
      //         };
      //       })
      //       .filter(
      //         (
      //           item
      //         ): item is {
      //           menuId: string;
      //           name: string;
      //           price: number;
      //           quantity: number;
      //           imageUrl: string;
      //         } => item !== null
      //       );

      //     if (enrichedCartItems.length === 0) {
      //       set({ loading: false });
      //       alert("Your cart is empty or contains invalid items.");
      //       return;
      //     }

      //     // ✅ Prepare payload
      //     const validatedCheckoutSession: CheckoutSessionRequest = {
      //       ...checkoutSession,
      //       cartItems: enrichedCartItems,
      //     };

      //     // ✅ Send to backend
      //     const response = await axios.post(
      //       `${API_END_POINT}/checkout/create-checkout-session`,
      //       validatedCheckoutSession,
      //       {
      //         headers: { "Content-Type": "application/json" },
      //         withCredentials: true,
      //       }
      //     );

      //     // ✅ Clear cart
      //     useCartStore.getState().clearCart();

      //     // ✅ Redirect to Stripe
      //     window.location.href = response.data.session.url;
      //     set({ loading: false });
      //   } catch (error: any) {
      //     console.error("Checkout error:", error);
      //     set({ loading: false });
      //     alert(
      //       error.response?.data?.message || "Failed to create checkout session"
      //     );
      //   }
      // },

      createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
        try {
            set({ loading: true });
            console.log("try to send checkoutSessionData to backend");
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            
            console.log("comeback from backend with response", response);

            // clear Cart after Checkout // Self
            useCartStore.getState().clearCart();

            window.location.href = response.data.session.url;
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`, {
            withCredentials: true,
          });
          set({ loading: false, orders: response.data.orders });
        } catch (error) {
          console.error(error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
