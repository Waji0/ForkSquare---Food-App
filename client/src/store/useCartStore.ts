import type { CartState } from "../types/cartType";
// import type { MenuItem } from "../types/restaurantType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      // addToCart: (item: MenuItem) => {
      //   set((state) => {
      //     const exisitingItem = state.cart.find(
      //       (cartItem) => cartItem._id === item._id
      //     );

      //     if (exisitingItem) {
      //       // already added in cart then inc qty
      //       return {
      //         cart: state?.cart.map((cartItem) =>
      //           cartItem._id === item._id
      //             ? { ...cartItem, quantity: cartItem.quantity + 1 }
      //             : cartItem
      //         ),
      //       };
      //     } else {
      //       // add cart
      //       return {
      //         cart: [...state.cart, { ...item, quantity: 1 }],
      //       };
      //     }
      //   });
      // },

      addToCart: (menuItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              // cartItem._id === menuItem._id && cartItem.restaurantId === restaurantId
            cartItem.menuId === menuItem._id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                // cartItem._id === menuItem._id && cartItem.restaurantId === restaurantId
                  cartItem.menuId === menuItem._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                // _id: menuItem._id, // menuId
                // restaurantId, // ✅ attach restaurantId
                menuId: menuItem._id,
                name: menuItem.name,
                imageUrl:
                  menuItem.imageUrl || "https://example.com/placeholder.png",
                price: Number(menuItem.price),
                quantity: 1,
              },
            ],
          };
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.menuId !== id),
        }));
      },

      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.menuId === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.menuId === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);