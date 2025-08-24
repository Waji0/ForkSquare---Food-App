import { useEffect, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import type { CheckoutSessionRequest, RCSRType } from "../types/orderType";
import { useCartStore } from "../store/useCartStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useOrderStore } from "../store/useOrderStore";
import { Loader2 } from "lucide-react";
// import type { CartItem } from "@/types/cartType";



const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>;}) => {

    const { user } = useUserStore();

    const [input, setInput] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact.toString() || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
    });

    const { cart } = useCartStore();
    const { singleRestaurant, restaurant, getAllRestaurants, restaurants } = useRestaurantStore();
    console.log("singleRestaurant & Restaurant from restaurantStore", singleRestaurant, " ",  restaurant);
    const { createCheckoutSession, loading } = useOrderStore();
    // const { findRestaurantIdByMenuId } = useRestaurantStore();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    // const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     // API Implementation
    //     try {

    //         console.log("checkoutHandler call in try block after Continue To Payment");

    //         // const checkoutData: CheckoutSessionRequest = {
    //         //     cartItems: cart.map((cartItem) => ({
    //         //         // menuId: cartItem.menuId, 
    //         //         _id: cartItem._id,
    //         //         name: cartItem.name,
    //         //         imageUrl: cartItem.imageUrl || "https://example.com/placeholder.png",
    //         //         price: Number(cartItem.price) || 0,
    //         //         quantity: Number(cartItem.quantity) || 0,
    //         //     })),
    //         //     deliveryDetails: input,
    //         //     restaurantId: singleRestaurant?._id as string || "",
    //         //     // totalAmount: totalAmount,
    //         //     // status: "pending",
    //         // };

    //         const checkoutData: CheckoutSessionRequest = {
    //           restaurants: Object.values(
    //             cart.reduce((acc: any, item) => {
    //               if (!acc[item._id]) {
    //                 acc[item._id] = {
    //                   restaurantId: item._id,
    //                   cartItems: [],
    //                 };
    //               }
    //               acc[item._id].cartItems.push({
    //                 menuId: item._id,
    //                 name: item.name,
    //                 imageUrl:
    //                   item.imageUrl || "https://example.com/placeholder.png",
    //                 price: Number(item.price) || 0,
    //                 quantity: Number(item.quantity) || 0,
    //               });
    //               return acc;
    //             }, {})
    //           ),
    //           deliveryDetails: input,
    //         };

    //         console.log("checkoutData ready now passing it createCheckoutSession from orderStore ", checkoutData);

    //         await createCheckoutSession(checkoutData);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // <-------------------------------------------------------------------------------------------------->

    // const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();

    //   try {
    //     console.log("checkoutHandler: preparing checkoutData...");

    //     // ✅ Group cart items by restaurantId
    //     // const groupedRestaurants = Object.values(
    //     //   // cart.reduce((acc: any, item) => {
    //     //   cart.reduce<Record<string, RCSRType>>((acc, item) => {
    //     //     const rId = item.restaurantId; // ✅ now explicitly typed

    //     //     if (!acc[rId]) {
    //     //       acc[rId] = {
    //     //         restaurantId: rId,
    //     //         cartItems: [],
    //     //       };
    //     //     }

    //     //     acc[rId].cartItems.push({
    //     //       _id: item._id, // menuId
    //     //       name: item.name,
    //     //       imageUrl: item.imageUrl || "https://example.com/placeholder.png",
    //     //       price: Number(item.price) || 0,
    //     //       quantity: Number(item.quantity) || 0,
    //     //       restaurantId: rId, // ✅ keep for frontend but backend won’t use it
    //     //     });

    //     //     return acc;
    //     //   }, {})
    //     // ); // restaurantId in CartItem

    //     const groupedRestaurants = Object.values(
    //       cart.reduce<Record<string, RestaurantCart>>((acc, item) => {
    //         const rId = findRestaurantIdByMenuId(item._id); // 🔥 utility to map menuId → restaurantId
    //         if (!acc[rId]) {
    //           acc[rId] = {
    //             restaurantId: rId,
    //             cartItems: [],
    //           };
    //         }
    //         acc[rId].cartItems.push({
    //           _id: item._id,
    //           name: item.name,
    //           imageUrl: item.imageUrl,
    //           price: item.price,
    //           quantity: item.quantity,
    //         });
    //         return acc;
    //       }, {})
    //     );


    //     // ✅ Build checkout payload
    //     const checkoutData: CheckoutSessionRequest = {
    //       restaurants: groupedRestaurants,
    //       deliveryDetails: input, // comes from your form state
    //     };

    //     console.log("checkoutData ready:", checkoutData);

    //     // ✅ Call backend
    //     await createCheckoutSession(checkoutData);
    //   } catch (error) {
    //     console.error("checkoutHandler error:", error);
    //   }
    // };


  // 🔹 Build menuId → restaurantId map
  
  
  const menuRestaurantMap: Record<string, string> = {};
  restaurants.forEach((r: any) => {
    r.menus.forEach((m: any) => {
      menuRestaurantMap[m._id] = r._id;
    });
  });

  const findRestaurantIdByMenuId = (menuId: string): string => {
    const rId = menuRestaurantMap[menuId];
    if (!rId) {
      throw new Error(`No restaurant found for menuId: ${menuId}`);
    }
    return rId;
  };

  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("checkoutHandler: preparing checkoutData...");

      // ✅ Group cart items by restaurant
      const groupedRestaurants = Object.values( // RestaurantCart
        cart.reduce<Record<string, RCSRType>>((acc, cartItem) => {
          const rId = findRestaurantIdByMenuId(cartItem.menuId);

          if (!acc[rId]) {
            acc[rId] = {
              restaurantId: rId,
              cartItems: [],
            };
          }

          acc[rId].cartItems.push({
            menuId: cartItem.menuId, // <--- menuId in cartItem
            name: cartItem.name,
            imageUrl: cartItem.imageUrl || "https://example.com/placeholder.png",
            price: Number(cartItem.price) || 0,
            quantity: Number(cartItem.quantity) || 0,
          });

          return acc;
        }, {})
      );

      // ✅ Build checkout payload
      const checkoutData: CheckoutSessionRequest = {
        restaurants: groupedRestaurants,
        deliveryDetails: input,
      };

      console.log("checkoutData ready:", checkoutData);

      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.error("checkoutHandler error:", error);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white">

                <DialogTitle className="font-semibold">Review Your Order</DialogTitle>

                <DialogDescription className="text-xs">
                    Double-check your delivery details and ensure everything is in order.
                    When you are ready, hit confirm button to finalize your order
                </DialogDescription>

                <form
                    onSubmit={checkoutHandler}
                    className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
                >
                    <div>
                        <Label className="my-2">Fullname</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>
                    
                    <div>
                        <Label className="my-2">Email</Label>
                        <Input
                            disabled
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="my-2">Contact</Label>
                        <Input
                            type="text"
                            name="contact"
                            value={input.contact}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="my-2">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={input.address}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="my-2">City</Label>
                        <Input
                            type="text"
                            name="city"
                            value={input.city}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div>
                        <Label className="my-2">Country</Label>
                        <Input
                            type="text"
                            name="country"
                            value={input.country}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <DialogFooter className="col-span-2 pt-5">
                        {loading ? (
                            <Button disabled className="bg-orange hover:bg-hoverOrange">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button className=" w-full bg-orange hover:bg-hoverOrange">
                                Continue To Payment
                            </Button>
                        )}
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
};

export default CheckoutConfirmPage;