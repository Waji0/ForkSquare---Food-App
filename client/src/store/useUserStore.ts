// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import axios from "axios";
// import type { LoginInputState, SignupInputState } from "../Schema/userSchema";
// import { toast } from "sonner";

// const API_END_POINT = "https://forksquare-server.vercel.app/api/v1/user";
// // const API_END_POINT = "http://localhost:3000/api/v1/user";
// axios.defaults.withCredentials = true;

// type User = {
//   fullname: string;
//   email: string;
//   contact: number;
//   address: string;
//   city: string;
//   country: string;
//   profilePicture: string;
//   admin: boolean;
//   isVerified: boolean;
// };

// type UserState = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isCheckingAuth: boolean;
//   loading: boolean;
//   signup: (input: SignupInputState) => Promise<void>;
//   login: (input: LoginInputState) => Promise<void>;
//   verifyEmail: (verificationCode: string) => Promise<void>;
//   checkAuthentication: () => Promise<void>;
//   logout: () => Promise<void>;
//   forgotPassword: (email: string) => Promise<void>;
//   resetPassword: (token: string, newPassword: string) => Promise<boolean>;
//   updateProfile: (input: any) => Promise<void>;
// };

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       isCheckingAuth: true,
//       loading: false,

//       // signup api implementation
//       signup: async (input: SignupInputState) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(`${API_END_POINT}/signup`, input, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({
//               loading: false,
//               user: response.data.user,
//               isAuthenticated: true,
//             });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       login: async (input: LoginInputState) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(`${API_END_POINT}/login`, input, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({
//               loading: false,
//               user: response.data.user,
//               isAuthenticated: true,
//             });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       verifyEmail: async (verificationCode: string) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(
//             `${API_END_POINT}/verify-email`,
//             { verificationCode },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({
//               loading: false,
//               user: response.data.user,
//               isAuthenticated: true,
//             });
//           }
//         } catch (error: any) {
//           toast.success(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       checkAuthentication: async () => {
//         try {
//           set({ isCheckingAuth: true });
//           const response = await axios.get(`${API_END_POINT}/check-auth`,
//             { withCredentials: true }
//           );

//           if (response.data.success) {
//             set({
//               user: response.data.user,
//               isAuthenticated: true,
//               isCheckingAuth: false,
//             });
//           }
//         } catch (error) {
//           set({ isAuthenticated: false, isCheckingAuth: false });
//         }
//       },

//       logout: async () => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(`${API_END_POINT}/logout`);

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({ loading: false, user: null, isAuthenticated: false });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       forgotPassword: async (email: string) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(
//             `${API_END_POINT}/forgot-password`,
//             { email }
//           );

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({ loading: false });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//           set({ loading: false });
//         }
//       },

//       resetPassword: async (token: string, newPassword: string) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(
//             `${API_END_POINT}/reset-password/${token}`,
//             { newPassword }
//           );

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({ loading: false });
//             return true;
//           }
//           set({ loading: false });
//           return false;
//         } catch (error: any) {
//           toast.error(error.response?.data?.message || "Something went wrong");
//           set({ loading: false });
//           return false;
//         }
//       },

//       updateProfile: async (input: any) => {
//         try {
//           const response = await axios.put(
//             `${API_END_POINT}/profile/update`,
//             input,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.data.success) {
//             toast.success(response.data.message);
//             set({ user: response.data.user, isAuthenticated: true });
//           }
//         } catch (error: any) {
//           toast.error(error.response.data.message);
//         }
//       },
      
//     }),
//     {
//       name: "user-name",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );


import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { LoginInputState, SignupInputState } from "../Schema/userSchema";
import { toast } from "sonner";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://forksquare-server.vercel.app/api/v1";

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const { data } = await axios.post("/user/signup", input, {
            headers: { "Content-Type": "application/json" },
          });
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },

      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const { data } = await axios.post("/user/login", input, {
            headers: { "Content-Type": "application/json" },
          });
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },

      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            "/user/verify-email",
            { verificationCode },
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Email verification failed");
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const { data } = await axios.get("/user/check-auth");
          if (data.success) {
            set({ user: data.user, isAuthenticated: true, isCheckingAuth: false });
          } else {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
          }
        } catch {
          set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.post("/user/logout");
          if (data.success) {
            toast.success(data.message);
            set({ user: null, isAuthenticated: false, loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Logout failed");
          set({ loading: false });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post("/user/forgot-password", { email });
          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Forgot password failed");
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`/user/reset-password/${token}`, { newPassword });
          if (data.success) {
            toast.success(data.message);
            return true;
          }
          return false;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Reset password failed");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input: any) => {
        try {
          const { data } = await axios.put("/user/profile/update", input, {
            headers: { "Content-Type": "application/json" },
          });
          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Profile update failed");
        }
      },
      
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
