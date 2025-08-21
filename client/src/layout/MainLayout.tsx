import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0 items-center justify-center">

        <header className="md:mb-14 mb-12">
            <Navbar />
        </header>

        <div className="flex-1 md:w-full w-full mt-4 md:mt-4">
            <Outlet/>
        </div>

        <Footer />
      
    </div>
  )
}

export default MainLayout
