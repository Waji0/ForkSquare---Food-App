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
import Stripe from "stripe";
import { Order } from "../models/order.model";
import { IMenuDocument } from "../models/menu.model";
// import { ICartItem as CartItem, Order, IOrder } from "../models/order.model";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id }).populate("user").populate("restaurant");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// types/order.ts
export type CheckoutSessionRequest = {

  restaurants: {
    restaurantId: string;
    cartItems: {
      _id: string;
      name: string;
      imageUrl: string;
      price: number;
      quantity: number;
    }[];
  }[];

  deliveryDetails: {
    email: string;
    name: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };

};

export interface Orders {

  _id: string;

  restaurants: {
    restaurantId: string;
    cartItems: CheckoutSessionRequest["restaurants"][number]["cartItems"];
    totalAmount: number; // per-restaurant total
  }[];

  deliveryDetails: CheckoutSessionRequest["deliveryDetails"];

  totalAmount: number; // grand total

  status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
}



// export const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     if (!req.id) {
//       return res.status(401).json({ message: "Unauthorized: user not found" });
//     }

//     // const { restaurants, deliveryDetails } = req.body as CheckoutSessionRequest;
//     const { restaurants, deliveryDetails }: CheckoutSessionRequest = req.body;

//     if (!restaurants || restaurants.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // let allLineItems: any[] = [];
//     // let orders: any[] = [];
//     let allLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
//     // let orders: Orders[] = [];
//     let orders: IOrder[] = [];

//     for (const r of restaurants) {
//       // const restaurant = await Restaurant.findById(r.restaurantId).populate("menus");
//       const restaurant = await Restaurant.findById(r.restaurantId).populate("menus") as unknown as IPRes;
//       if (!restaurant) continue;

//       // Validate and compute total
//       // const totalAmount = r.cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
//       const totalAmount = r.cartItems.reduce((sum, cartItem) => {

//         const menuItem = restaurant.menus.find(
//           (m: any) => m._id.toString() === cartItem._id
//         );


//         if (!menuItem) throw new Error(`Invalid menu item: ${cartItem._id}`);
//         return sum + menuItem.price * cartItem.quantity;

//       }, 0);


//       // Save order for this restaurant
//       const order = new Order({
//         user: req.id,
//         restaurant: r.restaurantId,
//         deliveryDetails,
//         cartItems: r.cartItems,
//         totalAmount,
//         status: "pending",
//       });
//       await order.save();
//       orders.push(order);

//       // Prepare line items for Stripe
//       const lineItems = r.cartItems.map((cartItem: CartItem) => {
//         const menuItem = restaurant.menus.find((m: any) => m._id.toString() === cartItem._id);
//         if (!menuItem) throw new Error(`Menu item ${cartItem._id} not found in ${restaurant.restaurantName}`);
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: menuItem.name,
//               images: [menuItem.imageUrl],
//             },
//             unit_amount: menuItem.price * 100,
//           },
//           quantity: cartItem.quantity,
//         };
//       });

//       allLineItems = allLineItems.concat(lineItems);
//     }

//     // Create a single Stripe session with all restaurants' items
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: allLineItems,
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/order/status`,
//       cancel_url: `${process.env.FRONTEND_URL}/cart`,
//       metadata: {
//         orderIds: JSON.stringify(orders.map((o) => o._id.toString())),
//       },
//     });

//     return res.status(200).json({ session });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const createCheckoutSession = async (req: Request, res: Response) => {
  try {

    if (!req.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const { restaurants, deliveryDetails }: CheckoutSessionRequest = req.body;

    if (!restaurants || restaurants.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let allLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let restaurantTotals: { restaurantId: string; totalAmount: number }[] = [];

    // 🔹 Step 1: Validate & prepare totals
    for (const r of restaurants) {

      // const restaurant = await Restaurant.findById(r.restaurantId).populate("menus");
      const restaurant = await Restaurant.findById(r.restaurantId).populate<{ menus: IMenuDocument[] }>("menus");

      if (!restaurant) throw new Error(`Restaurant not found: ${r.restaurantId}`);

      // validate & compute total per restaurant
      const totalAmount = r.cartItems.reduce((sum, cartItem) => {
        const menuItem = restaurant.menus.find(
          (m: any) => m._id.toString() === cartItem._id
        );
        if (!menuItem) throw new Error(`Invalid menu item: ${cartItem._id}`);
        return sum + menuItem.price * cartItem.quantity;
      }, 0);

      restaurantTotals.push({
        restaurantId: r.restaurantId,
        totalAmount,
      });

      // prepare stripe line items
      const lineItems = r.cartItems.map((cartItem) => {
        const menuItem = restaurant.menus.find(
          (m: any) => m._id.toString() === cartItem._id
        );
        if (!menuItem) throw new Error(`Menu item ${cartItem._id} not found`);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: menuItem.name,
              images: [menuItem.imageUrl],
            },
            unit_amount: menuItem.price * 100,
          },
          quantity: cartItem.quantity,
        };
      });

      allLineItems = allLineItems.concat(lineItems);
    }

    // 🔹 Step 2: Compute grand total
    const grandTotal = restaurantTotals.reduce((sum, r) => sum + r.totalAmount, 0);

    // 🔹 Step 3: Save a single Order document
    const order = new Order({
      user: req.id,
      restaurants: restaurants.map((r, i) => ({
        restaurantId: r.restaurantId,
        cartItems: r.cartItems,
        totalAmount: restaurantTotals[i].totalAmount,
      })),
      deliveryDetails,
      totalAmount: grandTotal,
      status: "pending",
    });

    await order.save();

    // 🔹 Step 4: Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: allLineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        restaurantTotals: JSON.stringify(restaurantTotals),
        grandTotal: grandTotal.toString(),
      },
    });

    return res.status(200).json({ session });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

