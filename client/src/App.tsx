// import Login from "./auth/Login";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Signup from "./auth/Signup";
// import ForgotPassword from "./auth/ForgotPassword";
// import ResetPassword from "./auth/ResetPassword";
// import VerifyEmail from "./auth/VerifyEmail";
// import HeroSection from "./components/HeroSection";
// import MainLayout from "./layout/MainLayout";
// import Profile from "./components/Profile";
// import SearchPage from "./components/SearchPage";
// import RestaurantDetail from "./components/RestaurantDetail";
// import Cart from "./components/Cart";
// import Restaurant from "./admin/Restaurant";
// import AddMenu from "./admin/AddMenu";
// import Orders from "./admin/Orders";
// import SuccessOrder from "./components/SuccessOrder";
// import { useUserStore } from "./store/useUserStore";
// import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import Loading from "./components/Loading";

// import NotFound from "./components/NotFound";
// import AboutUs from "./components/AboutUs";
// import Services from "./components/Services";
// import Contact from "./components/Contact";
// import PrivacyPolicy from "./components/PrivacyPolicy";



// const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, user } = useUserStore();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!user?.isVerified) {
//     return <Navigate to="/verify-email" replace />;
//   }

//   return children;
// };


// const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, user } = useUserStore();

//   if (isAuthenticated && !user?.isVerified) {
//   return <Navigate to="/verify-email" replace />;
//   }

//   if(isAuthenticated && user?.isVerified){
//     return <Navigate to="/" replace/>
//   }

//   return children;
// };


// const AdminRoute = ({children}:{children:React.ReactNode}) => {
//   const {user, isAuthenticated} = useUserStore();

//   if(!isAuthenticated){
//     return <Navigate to="/login" replace/>
//   }

//   if(!user?.admin){
//     return <Navigate to="/" replace/>
//   }

//   return children;
// };


// // const appRouter = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: (
// //       <ProtectedRoutes>
// //         <MainLayout />
// //       </ProtectedRoutes>
// //     ),
// //     children: [
// //       {
// //         path: "/",
// //         element: <HeroSection />,
// //       },
// //       {
// //         path: "/profile",
// //         element: <Profile />,
// //       },
// //       {
// //         path: "/search/:text",
// //         element: <SearchPage />,
// //       },
// //       {
// //         path: "/restaurant/:id",
// //         element: <RestaurantDetail />,
// //       },
// //       {
// //         path: "/cart",
// //         element: <Cart />,
// //       },
// //       {
// //         path: "/order/status",
// //         element: <SuccessOrder />,
// //       },
// //       // admin services start from here
// //       {
// //         path: "/admin/restaurant",
// //         element:<AdminRoute><Restaurant /></AdminRoute>,
// //       },
// //       {
// //         path: "/admin/menu",
// //         element:<AdminRoute><AddMenu /></AdminRoute>,
// //       },
// //       {
// //         path: "/admin/orders",
// //         element:<AdminRoute><Orders /></AdminRoute>,
// //       },
// //     ],
// //   },
// //   {
// //     path: "/login",
// //     element:<AuthenticatedUser><Login /></AuthenticatedUser>,
// //     // element:<Login />,
// //   },
// //   {
// //     path: "/signup",
// //     element:<AuthenticatedUser><Signup /></AuthenticatedUser> ,
// //     // element:<Signup />,
// //   },
// //   {
// //     path: "/forgot-password",
// //     element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
// //     // element:<ForgotPassword />,
// //   },
// //   {
// //     path: "/reset-password/:resetToken",
// //     element: <ResetPassword />,
// //   },
// //   {
// //     path: "/verify-email",
// //     element: <VerifyEmail />,
// //   },
// //    {
// //     path: "*",
// //     element: <NotFound />,
// //   },
// // ]);

// const appRouter = createBrowserRouter([
//   {
//     path: "/", element: ( <ProtectedRoutes><MainLayout /></ProtectedRoutes>),
//     children: [
//       { index: true, element: <HeroSection /> },
//       { path: "/profile", element: <Profile /> },
//       { path: "/search/:text", element: <SearchPage /> },
//       { path: "/restaurant/:id", element: <RestaurantDetail /> },
//       { path: "/cart", element: <Cart /> },
//       { path: "/order/status", element: <SuccessOrder /> },
//       { path: "/about", element: <AboutUs /> },
//       { path: "/services", element: <Services /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/privacy-policy", element: <PrivacyPolicy /> },
//       // admin
//       { path: "/admin/restaurant", element:<AdminRoute><Restaurant /></AdminRoute> },
//       { path: "/admin/menu", element:<AdminRoute><AddMenu /></AdminRoute> },
//       { path: "/admin/orders", element:<AdminRoute><Orders /></AdminRoute> },
//     ],
//   },
//   // auth + not found routes...
//   { path: "/login", element:<AuthenticatedUser><Login /></AuthenticatedUser> },
//   { path: "/signup", element:<AuthenticatedUser><Signup /></AuthenticatedUser> },
//   { path: "/forgot-password", element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser> },
//   { path: "/reset-password/:resetToken", element: <ResetPassword /> },
//   { path: "/verify-email", element: <VerifyEmail /> },
//   { path: "*", element: <NotFound /> },
// ]);

// function App() {

//   const {checkAuthentication, isCheckingAuth} = useUserStore();

//   // checking auth every time when page is loaded
//   useEffect(() => {

//     checkAuthentication();

//   },[checkAuthentication]);

//   if(isCheckingAuth) return <Loading/>

//   return (
//     <main>
//       <RouterProvider router={appRouter}></RouterProvider>
//     </main>
//   );

// }

// export default App;








import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import SuccessOrder from "./components/SuccessOrder";
import { useUserStore } from "./store/useUserStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading";

import NotFound from "./components/NotFound";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";

// ✅ Protected routes wrapper
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

// ✅ Prevents logged-in users from accessing login/signup/forgot
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) return <Loading />;

  if (isAuthenticated && !user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ✅ Admin-only routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.admin) return <Navigate to="/" replace />;

  return children;
};

// ✅ Router config
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <HeroSection /> },
      { path: "profile", element: <Profile /> },
      { path: "search/:text", element: <SearchPage /> },
      { path: "restaurant/:id", element: <RestaurantDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "order/status", element: <SuccessOrder /> },
      { path: "about", element: <AboutUs /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      // ✅ Admin
      { path: "admin/restaurant", element: <AdminRoute><Restaurant /></AdminRoute> },
      { path: "admin/menu", element: <AdminRoute><AddMenu /></AdminRoute> },
      { path: "admin/orders", element: <AdminRoute><Orders /></AdminRoute> },
    ],
  },
  // ✅ Auth + misc routes
  { path: "/login", element: <AuthenticatedUser><Login /></AuthenticatedUser> },
  { path: "/signup", element: <AuthenticatedUser><Signup /></AuthenticatedUser> },
  { path: "/forgot-password", element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser> },
  { path: "/reset-password/:resetToken", element: <ResetPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  const { checkAuthentication } = useUserStore();

  // ✅ check auth on page load
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;