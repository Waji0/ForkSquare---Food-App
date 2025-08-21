import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";
// import Loading from "@/components/Loading";

// const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/menu";
const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;

type MenuState = {
    loading: boolean,
    menu: null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
    deleteMenu: (menuId: string) => Promise<void>; //self
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,

      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }

          // update restaurant
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
          }

          // update restaurant menu
          useRestaurantStore
            .getState()
            .updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      //   deleteMenu: async (menuId: string) => {
      //     try {
      //       set({ loading: true });
      //       const response = await axios.delete(`${API_END_POINT}/${menuId}`);

      //       if (response.data.success) {
      //         toast.success(response.data.message);
      //         set({ loading: false });

      //         // update/set restaurantStore menus
      //         useRestaurantStore.getState().setRestaurantMenus(response.data.menus);
      //       }
      //     } catch (error: any) {
      //       toast.error(error.response?.data?.message || "Something went wrong");
      //       set({ loading: false });
      //     }
      //   },

      deleteMenu: async (menuId: string) => {
        try {
          set({ loading: true });
          const response = await axios.delete(`${API_END_POINT}/${menuId}`);

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });

            // ✅ remove from restaurant store
            useRestaurantStore.getState().removeMenuFromRestaurant(menuId);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
      },
      
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);