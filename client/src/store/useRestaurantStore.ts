// import type { Orders } from "../types/orderType";
// import type { MenuItem, RestaurantState } from "../types/restaurantType";
// import axios from "axios";
// import { toast } from "sonner";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";



// const API_END_POINT = "https://forksquare-server.vercel.app/api/v1/restaurant";
// // const API_END_POINT = "http://localhost:3000/api/v1/restaurant";
// axios.defaults.withCredentials = true;


// export const useRestaurantStore = create<RestaurantState>()(
//   persist(
//     (set, get) => ({
//       loading: false,
//       restaurant: null,
//       searchedRestaurant: null,
//       appliedFilter: [],
//       singleRestaurant: null,
//       restaurantOrder: [],

//       createRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(`${API_END_POINT}/`, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//           });

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({ loading: false });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       getRestaurant: async () => {
//         try {
//           set({ loading: true });
//           const response = await axios.get(`${API_END_POINT}/`, {
//              withCredentials: true,
//           });

//           if (response.data.success) {
//             set({ loading: false, restaurant: response.data.restaurant });
//           }
//         } catch (error: any) {
//           if (error.response.status === 404) {
//             set({ restaurant: null });
//           }

//           set({ loading: false });
//         }
//       },

//       updateRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const response = await axios.put(`${API_END_POINT}/`, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//           });

//           if (response.data.success) {
//             toast.success(response.data.message || "Restaurant updated!");
//             set({ loading: false });
//           }

//           // if (response.data.success) {
//           //   toast.success(response.data.message || "Restaurant updated!");
//           // } else {
//           //   toast.error("Something went wrong");
//           // }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       deleteRestaurant: async () => {
//         try {
//           const response = await axios.delete(`${API_END_POINT}/`, {
//           withCredentials: true,
//           });

//           if (response.data.success) {
//             toast.success(
//               response.data.message || "Restaurant deleted successfully"
//             );
//             // Reset local state after deletion
//             set({
//               restaurant: null,
//               restaurantOrder: [],
//               singleRestaurant: null,
//             });
//           }
//         } catch (error: any) {
//           toast.error(
//             error.response?.data?.message || "Failed to delete restaurant"
//           );
//         }
//       },

//       searchRestaurant: async (
//         searchText: string,
//         searchQuery: string,
//         selectedCuisines: any
//       ) => {
//         try {
//           set({ loading: true });
//           const params = new URLSearchParams();
//           params.set("searchQuery", searchQuery);
//           params.set("selectedCuisines", selectedCuisines.join(","));
//           // await new Promise((resolve) => setTimeout(resolve, 2000));
//           const response = await axios.get(
//             `${API_END_POINT}/search/${searchText}?${params.toString()}`
//           );

//           if (response.data.success) {
//             set({ loading: false, searchedRestaurant: response.data });
//           }
//         } catch (error) {
//           set({ loading: false });
//         }
//       },

//       addMenuToRestaurant: (menu: MenuItem) => {
//         set((state: any) => ({
//           restaurant: state.restaurant
//             ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
//             : null,
//         }));
//       },

//       updateMenuToRestaurant: (updatedMenu: MenuItem) => {
//         set((state: any) => {
//           if (state.restaurant) {
//             const updatedMenuList = state.restaurant.menus.map((menu: any) =>
//               menu._id === updatedMenu._id ? updatedMenu : menu
//             );
//             return {
//               restaurant: {
//                 ...state.restaurant,
//                 menus: updatedMenuList,
//               },
//             };
//           }

//           // if state.restaruant is undefined then return state
//           return state;
//         });
//       },

//       //self
//       removeMenuFromRestaurant: (menuId: string) => {
//         set((state: any) => {
//           if (state.restaurant) {
//             return {
//               restaurant: {
//                 ...state.restaurant,
//                 menus: state.restaurant.menus.filter(
//                   (menu: any) => menu._id !== menuId
//                 ),
//               },
//             };
//           }
//           return state;
//         });
//       },

//       //   setRestaurantMenus: (menus: MenuItem[]) => {
//       //     set((state: any) => ({
//       //       restaurant: state.restaurant ? { ...state.restaurant, menus } : null,
//       //     }));
//       //   },

//       setAppliedFilter: (value: string) => {
//         set((state) => {
//           const isAlreadyApplied = state.appliedFilter.includes(value);
//           const updatedFilter = isAlreadyApplied
//             ? state.appliedFilter.filter((item) => item !== value)
//             : [...state.appliedFilter, value];
//           return { appliedFilter: updatedFilter };
//         });
//       },

//       resetAppliedFilter: () => {
//         set({ appliedFilter: [] });
//       },

//       getSingleRestaurant: async (restaurantId: string) => {
//         try {
//           const response = await axios.get(`${API_END_POINT}/${restaurantId}`);

//           if (response.data.success) {
//             set({ singleRestaurant: response.data.restaurant });
//           }

//           // } catch (error) { }
//         } catch (error) {
//           console.log(error);
//         }
//       },

//       getRestaurantOrders: async () => {
//         try {
//           const response = await axios.get(`${API_END_POINT}/order`);

//           if (response.data.success) {
//             set({ restaurantOrder: response.data.orders });
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },

//       updateRestaurantOrder: async (orderId: string, status: string) => {
//         try {
//           const response = await axios.put(
//             `${API_END_POINT}/order/${orderId}/status`,
//             { status },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.data.success) {
//             const updatedOrder = get().restaurantOrder.map((order: Orders) => {
//               return order._id === orderId
//                 ? { ...order, status: response.data.status }
//                 : order;
//             });
//             set({ restaurantOrder: updatedOrder });
//             toast.success(response.data.message);
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//         }
//       },
//     }),
//     {
//       name: "restaurant-name",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );







// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import axios from "axios";
// import { toast } from "sonner";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://forksquare-server.vercel.app/api/v1";

// export const useRestaurantStore = create<any>()(
//   persist(
//     (set, _ ) => ({
//       loading: false,
//       restaurant: null,

//       createRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const { data } = await axios.post("/restaurant/", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//             withCredentials: true,
//           });
//           if (data.success) toast.success(data.message);
//           set({ loading: false });
//         } catch (err: any) {
//           toast.error(err.response?.data?.message || "Failed to create restaurant");
//           set({ loading: false });
//         }
//       },

//       getRestaurant: async () => {
//         try {
//           set({ loading: true });
//           const { data } = await axios.get("/restaurant/", {
//              withCredentials: true,
//            });
//           if (data.success) set({ restaurant: data.restaurant, loading: false });
//         } catch (err: any) {
//           toast.error(err.response?.data?.message || "Failed to fetch restaurant");
//           set({ loading: false });
//         }
//       },

//       updateRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const { data } = await axios.put("/restaurant/", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//             withCredentials: true,
//           });
//           if (data.success) toast.success(data.message || "Restaurant updated!");
//           set({ loading: false });
//         } catch (err: any) {
//           toast.error(err.response?.data?.message || "Update failed");
//           set({ loading: false });
//         }
//       },

//       deleteRestaurant: async () => {
//         try {
//           const { data } = await axios.delete("/restaurant/", {
//              withCredentials: true,
//            });
//           if (data.success) toast.success(data.message || "Restaurant deleted");
//           set({ restaurant: null });
//         } catch (err: any) {
//           toast.error(err.response?.data?.message || "Delete failed");
//         }
//       },

//     }),
//     {
//       name: "restaurant-store",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );









import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { useUserStore } from "./useUserStore";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://forksquare-server.vercel.app/api/v1";

export const useRestaurantStore = create<any>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      // ---------------- Authentication Guard ----------------
      ensureAuthenticated: async () => {
        const userState = useUserStore.getState();
        if (!userState.isAuthenticated) {
          await userState.checkAuthentication();
        }
        if (!useUserStore.getState().isAuthenticated) {
          throw new Error("User not authenticated");
        }
      },

      // ---------------- Restaurant CRUD ----------------
      createRestaurant: async (formData: FormData) => {
        await get().ensureAuthenticated();
        try {
          set({ loading: true });
          const { data } = await axios.post("/restaurant/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          if (data.success) toast.success(data.message);
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to create restaurant");
        } finally {
          set({ loading: false });
        }
      },

      getRestaurant: async () => {
        await get().ensureAuthenticated();
        try {
          set({ loading: true });
          const { data } = await axios.get("/restaurant/", { withCredentials: true });
          if (data.success) set({ restaurant: data.restaurant });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch restaurant");
        } finally {
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        await get().ensureAuthenticated();
        try {
          set({ loading: true });
          const { data } = await axios.put("/restaurant/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          if (data.success) toast.success(data.message || "Restaurant updated!");
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Update failed");
        } finally {
          set({ loading: false });
        }
      },

      deleteRestaurant: async () => {
        await get().ensureAuthenticated();
        try {
          const { data } = await axios.delete("/restaurant/", { withCredentials: true });
          if (data.success) toast.success(data.message || "Restaurant deleted");
          set({ restaurant: null, restaurantOrder: [], singleRestaurant: null });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Delete failed");
        }
      },

      // ---------------- Restaurant Search ----------------
      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: string[]) => {
        await get().ensureAuthenticated();
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));
          const { data } = await axios.get(`/restaurant/search/${searchText}?${params.toString()}`);
          if (data.success) set({ searchedRestaurant: data.data });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Search failed");
        } finally {
          set({ loading: false });
        }
      },

      getSingleRestaurant: async (restaurantId: string) => {
        await get().ensureAuthenticated();
        try {
          const { data } = await axios.get(`/restaurant/${restaurantId}`, { withCredentials: true });
          if (data.success) set({ singleRestaurant: data.restaurant });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch restaurant");
        }
      },

      // ---------------- Orders ----------------
      getRestaurantOrders: async () => {
        await get().ensureAuthenticated();
        try {
          const { data } = await axios.get("/restaurant/order", { withCredentials: true });
          if (data.success) set({ restaurantOrder: data.orders });
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to fetch orders");
        }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        await get().ensureAuthenticated();
        try {
          const { data } = await axios.put(`/restaurant/order/${orderId}/status`, { status });
          if (data.success) {
            const updatedOrder = get().restaurantOrder.map((order: any) =>
              order._id === orderId ? { ...order, status: data.status } : order
            );
            set({ restaurantOrder: updatedOrder });
            toast.success(data.message);
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to update order");
        }
      },

      // ---------------- Menu Management ----------------
      addMenuToRestaurant: (menu: any) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return { restaurant: { ...state.restaurant, menus: updatedMenuList } };
          }
          return state;
        });
      },

      removeMenuFromRestaurant: (menuId: string) => {
        set((state: any) => {
          if (state.restaurant) {
            return {
              restaurant: {
                ...state.restaurant,
                menus: state.restaurant.menus.filter((menu: any) => menu._id !== menuId),
              },
            };
          }
          return state;
        });
      },

      // ---------------- Filters ----------------
      setAppliedFilter: (value: string) => {
        set((state: any) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item: string) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => set({ appliedFilter: [] }),
    }),
    {
      name: "restaurant-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
