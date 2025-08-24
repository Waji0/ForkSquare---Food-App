import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react"; 
import type { CartItem } from "../types/cartType";



const Success = () => {
  
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700">
          {/*  dark:text-gray-300 */}
          Order not found!
        </h1>
      </div>
    );

  return (
    //  dark:bg-gray-900
    // dark:bg-gray-800
    //  dark:text-gray-200
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Status:{" "}
            <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
          </h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {/*  dark:text-gray-300 */}
            Order Summary
          </h2>

          {/* Your Ordered Item Display here  */}
          {orders.map((order: any, index: number) => (
            <div key={index} className="border border-gray-900 p-2 m-2">

              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {/* dark:text-gray-200 */}
                  Order Status:{" "}
                  <span className="text-[#FF5A5A]">
                    {order.status.toUpperCase()}
                  </span>
                </h1>
              </div>

              <div className="text-gray-800 flex items-center">
                {/*  dark:text-gray-200 */}
                <IndianRupee />
                <span className="text-lg text-gray-950 font-medium">
                  {order.totalAmount}
                </span>
              </div>

              {order.cartItems.map((item: CartItem) => (
                <div key={item.menuId} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <h3 className="ml-4 text-gray-800 font-medium">
                        {/*  dark:text-gray-200 */}
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 flex items-center">
                        {/*  dark:text-gray-200 */}
                        <IndianRupee />
                        <span className="text-lg font-medium">
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <Link to="/cart">
          <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;