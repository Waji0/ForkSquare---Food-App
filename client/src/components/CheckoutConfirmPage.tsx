import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import type { CheckoutSessionRequest } from "../types/orderType";
import { useCartStore } from "../store/useCartStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useOrderStore } from "../store/useOrderStore";
import { Loader2 } from "lucide-react";



const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>;}) => {

    const { user } = useUserStore();

    const [input, setInput] = useState({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact.toString() || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || "",
        //self addition
        // totalAmount: totalAmount || 0,
    });

    const { cart } = useCartStore();
    const { restaurant } = useRestaurantStore();
    console.log("restaurantStore", restaurant);
    const { createCheckoutSession, loading } = useOrderStore();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // API Implementation
        try {

            const checkoutData: CheckoutSessionRequest = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem.menuId,
                    name: cartItem.name,
                    // image: cartItem.imageUrl,
                    // price: cartItem.price.toString(),
                    // quantity: cartItem.quantity.toString(),
                    imageUrl: cartItem.imageUrl || "https://example.com/placeholder.png",
                    price: Number(cartItem.price) || 0,
                    quantity: Number(cartItem.quantity) || 0,
                })),
                deliveryDetails: input,
                restaurantId: restaurant?._id as string || "",
                // totalAmount: totalAmount,
                // status: "pending",
            };

            await createCheckoutSession(checkoutData);

        } catch (error) {
            console.log(error);
        }
    };

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