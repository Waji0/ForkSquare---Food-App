// import { Request, Response } from "express";
// import { Restaurant } from "../models/restaurant.model";
// import { Order } from "../models/order.model";
// import Stripe from "stripe";



// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


// type CheckoutSessionRequest = {

//     cartItems: {
//         menuId: string;
//         name: string;
//         image: string;
//         price: number;
//         quantity: number
//     }[],

//     deliveryDetails: {
//         name: string;
//         email: string;
//         address: string;
//         city: string
//         // self addition
//         totalAmount: number;
//     },

//     restaurantId: string;
// };


// export const getOrders = async (req: Request, res: Response) => {

//     try {
//         const orders = await Order.find({ user: req.id }).populate('user').populate('restaurant');

//         return res.status(200).json({
//             success: true,
//             orders
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };


// // export const createCheckoutSession = async (req: Request, res: Response) => {

// //     try {
// //         const checkoutSessionRequest: CheckoutSessionRequest = req.body;
// //         const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');
        
// //         if (!restaurant) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Restaurant not found."
// //             });
// //         }

// //         const order: any = new Order({
// //             restaurant: restaurant._id,
// //             user: req.id,
// //             deliveryDetails: checkoutSessionRequest.deliveryDetails,
// //             cartItems: checkoutSessionRequest.cartItems,
// //             status: "pending",
// //             // self addition
// //             totalAmount: checkoutSessionRequest.deliveryDetails.totalAmount,
// //         });

// //         // line items
// //         const menuItems = restaurant.menus;
// //         const lineItems = createLineItems(checkoutSessionRequest, menuItems);

// //         const session = await stripe.checkout.sessions.create({
// //             payment_method_types: ['card'],
// //             shipping_address_collection: {
// //                 allowed_countries: ['GB', 'US', 'CA']
// //             },
// //             line_items: lineItems,
// //             mode: 'payment',
// //             success_url: `${process.env.FRONTEND_URL}/order/status`,
// //             cancel_url: `${process.env.FRONTEND_URL}/cart`,
// //             metadata: {
// //                 orderId: order._id.toString(),
// //                 images: JSON.stringify(menuItems.map((item: any) => item.image))
// //             }
// //         });

// //         if (!session.url) {
// //             return res.status(400).json({ success: false, message: "Error while creating session" });
// //         }

// //         await order.save();

// //         return res.status(200).json({
// //             session
// //         });

// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({ message: "Internal server error" })

// //     }
// // };


// // export const stripeWebhook = async (req: Request, res: Response) => {
// //     console.log("webhook hit");
// //     let event;

// //     try {
// //         const signature = req.headers["stripe-signature"];

// //         // Construct the payload string for verification
// //         const payloadString = JSON.stringify(req.body, null, 2);
// //         const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

// //         // Generate test header string for event construction
// //         const header = stripe.webhooks.generateTestHeaderString({
// //             payload: payloadString,
// //             secret,
// //         });

// //         // Construct the event using the payload string and header
// //         event = stripe.webhooks.constructEvent(payloadString, header, secret);

// //     } catch (error: any) {
// //         console.error('Webhook error:', error.message);
// //         return res.status(400).send(`Webhook error: ${error.message}`);
// //     }

// //     // Handle the checkout session completed event
// //     if (event.type === "checkout.session.completed") {
// //         try {
// //             const session = event.data.object as Stripe.Checkout.Session;
// //             const order = await Order.findById(session.metadata?.orderId);

// //             if (!order) {
// //                 return res.status(404).json({ message: "Order not found" });
// //             }

// //             // Update the order with the amount and status
// //             if (session.amount_total) {
// //                 order.totalAmount = session.amount_total;
// //             }

// //             order.status = "confirmed";
// //             await order.save();

// //         } catch (error) {
// //             console.error('Error handling event:', error);
// //             return res.status(500).json({ message: "Internal Server Error" });
// //         }
// //     }

// //     // Send a 200 response to acknowledge receipt of the event
// //     res.status(200).send();
// // };

// export const createCheckoutSession = async (req: Request, res: Response) => {
//     try {
//         const checkoutSessionRequest: CheckoutSessionRequest = req.body;

//         const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');

//         if (!restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Restaurant not found."
//             });
//         }

//         // ✅ Ensure cartItems always have image from restaurant.menus
//         const enrichedCartItems = checkoutSessionRequest.cartItems.map(
//           (cartItem: any) => {
//             const menu = (restaurant.menus as any[]).find(
//               (m: any) => m._id.toString() === cartItem.menuId
//             );
//             return {
//               menuId: cartItem.menuId,
//               name: cartItem.name,
//               price: cartItem.price,
//               quantity: cartItem.quantity,
//               imageUrl: menu?.imageUrl || "", // ✅ match Order schema
//             };
//           }
//         );


//         const order: any = new Order({
//             restaurant: restaurant._id,
//             user: req.id,
//             deliveryDetails: checkoutSessionRequest.deliveryDetails,
//             cartItems: enrichedCartItems, // ✅ fixed
//             status: "pending",
//             totalAmount: checkoutSessionRequest.deliveryDetails.totalAmount,
//         });

//         // line items for Stripe
//         const menuItems = restaurant.menus;
//         const lineItems = createLineItems(checkoutSessionRequest, menuItems);

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             shipping_address_collection: {
//                 allowed_countries: ["GB", "US", "CA"],
//             },
//             line_items: lineItems,
//             mode: "payment",
//             success_url: `${process.env.FRONTEND_URL}/order/status`,
//             cancel_url: `${process.env.FRONTEND_URL}/cart`,
//             metadata: {
//                 orderId: order._id.toString(),
//                 images: JSON.stringify(menuItems.map((item: any) => item.imageUrl)),
//             },
//         });

//         if (!session.url) {
//             return res.status(400).json({ success: false, message: "Error while creating session" });
//         }

//         await order.save();

//         return res.status(200).json({ session });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };


// export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {

//     // 1. create line items
//     const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
//         const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
//         if (!menuItem) throw new Error(`Menu item id not found`);

//         return {

//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: menuItem.name,
//                     images: [menuItem.image],
//                 },
//                 unit_amount: menuItem.price * 100
//             },

//             quantity: cartItem.quantity,
//         };
//     });

//     // 2. return lineItems
//     return lineItems;
// };


// <------------------------------------------------After Deploy------------------------------------------------>


import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { IOrder, Order } from "../models/order.model";
import Stripe from "stripe";
import { User } from "../models/user.model"; // or your User type/interface
import { IMenuDocument } from "../models/menu.model";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// frontend request only (what you send to backend)
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

// full order returned from backend
export interface Orders extends CheckoutSessionRequest {
  _id: string;
  totalAmount: number; // backend computed
  status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
}


export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id }).populate("user").populate("restaurant");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// export const createCheckoutSession = async (req: Request, res: Response) => {
//   try {

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized: user not found" });
//     }

//     const { cartItems, deliveryDetails, restaurantId } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // Calculate total amount server-side
//     const totalAmount = cartItems.reduce(
//       (sum: number, item: any) => sum + item.price * item.quantity,
//       0
//     );

//     const order = new Order({
//       user: req.user.id,
//       restaurant: restaurantId,
//       deliveryDetails,
//       cartItems,
//       totalAmount,
//       status: "pending", // always start with pending
//     });

//     await order.save();

//     res.status(201).json({
//       success: true,
//       message: "Checkout session created successfully",
//       order,
//     });
//   } catch (error: any) {
//     console.error("Checkout Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {

      console.log("right now in backend createCheckoutSession orderController");

      // if (!req.user || !req.user.id) {
      if (!req.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
      }
      
      console.log("req.id exists in backend createCheckoutSession orderController", req.id);

    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    console.log("checkoutSessionREquest in backend createCheckoutSession orderController", checkoutSessionRequest);
    // const { cartItems, deliveryDetails, restaurantId } = req.body;
    const { cartItems, deliveryDetails, restaurantId } = checkoutSessionRequest;
    console.log("cartItems, deliveryDetails, restaurantId in backend createCheckoutSession orderController", cartItems, deliveryDetails, restaurantId);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    console.log("cart exists in backend createCheckoutSession orderController", cartItems, cartItems.length);

    // Calculate total amount server-side
    const totalAmount = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    console.log("totalAmount in backend createCheckoutSession orderController", totalAmount);

    console.log("try  to find res by resId");

    const restaurant = await Restaurant.findById(restaurantId).populate('menus');

      if (!restaurant) {
          return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const order: IOrder = new Order({
            user: req.id, 
            // user: req.user.id,
            restaurant: restaurantId,
            deliveryDetails,
            cartItems,
            totalAmount,
            status: "pending", // always start with pending
        });

        console.log("Order Created - Before line item");

        // line items for Stripe
        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkoutSessionRequest, menuItems);

        console.log("lineItems Created - Before stripe.checkout.sessions.create", lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA"],
            },
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item: any) => item.imageUrl)),
            },
        });

        if (!session.url) {
            return res.status(400).json({ success: false, message: "Error while creating session" });
        }

        await order.save();

        return res.status(200).json({ session });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {

    // 1. create line items
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: IMenuDocument) => item._id.toString() === cartItem.menuId);
        if (!menuItem) throw new Error(`Menu item id not found`);

        return {

            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    // images: [menuItem.image],
                    images: [menuItem.imageUrl],
                },
                unit_amount: menuItem.price * 100
            },

            quantity: cartItem.quantity,
        };
    });

    // 2. return lineItems
    return lineItems;
};
