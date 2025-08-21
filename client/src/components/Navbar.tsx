import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, PackageCheck, ShoppingCart, SquareMenu, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { Info, Wrench, Mail, ShieldCheck } from "lucide-react";



const Navbar = () => {

  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();

  return (
    <div className="mx-auto fixed top-0 left-0 w-full bg-amber-300 z-50 p-2 md:p-2 ">
      <div className="max-w-7xl flex items-center justify-between h-14 ">

        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">ForkSquare</h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">

          <div className="hidden md:flex items-center gap-6">

            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>

            {user?.admin && (
              <Menubar className="border border-none">
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent className="bg-[#f9f9f9]">
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}

          </div>

          <div className="flex items-center gap-4">
           
            <Link to="/cart" className="relative cursor-pointer mr-4">
              <ShoppingCart />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {cart.length}
                </Button>
              )}
            </Link>

            <div>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Logout
                </Button>
              )}
            </div>
            
          </div>

        </div>

        <div className="md:hidden lg:hidden">
          {/* Mobile responsive  */}
          <MobileNavbar />
        </div>

      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {

  const { user, logout, loading } = useUserStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>ForkSquare Nav</SheetTitle>
        </SheetHeader>

        <Separator className="my-2" />

        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="flex flex-col gap-4">
          
          {/* Footer Nav Links */}
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <Link
              to="/about"
              className="flex items-center gap-3 hover:text-yellow-600 transition-colors"
            >
              <Info size={18} /> About
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-3 hover:text-yellow-600 transition-colors"
            >
              <Wrench size={18} /> Services
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 hover:text-yellow-600 transition-colors"
            >
              <Mail size={18} /> Contact
            </Link>
            <Link
              to="/privacy-policy"
              className="flex items-center gap-3 hover:text-yellow-600 transition-colors"
            >
              <ShieldCheck size={18} /> Privacy Policy
            </Link>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">ForkSquare</h1>
          </div>

          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-orange hover:bg-hoverOrange"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
