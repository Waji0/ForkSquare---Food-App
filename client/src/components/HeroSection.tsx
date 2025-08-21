import { useState } from "react"
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "../assets/Hero.png";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate(`/search/${searchText}`);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 p-6 rounded-lg items-center justify-center m-4 gap-20">
                
                <div className="flex flex-col items-center gap-10 md:mx-0 w-full px-4 md:px-0">

                    {/* flex flex-col items-center gap-10 md:mx-[40%] */}
                    <div className="flex flex-col gap-5">
                        <h1 className="textfont-bold md:font-extrabold md:text-5xl text-4xl">Order Food anytime & anywhere!</h1>
                        <p className="text-gray-500 text-2xl">Craving? We’re Just Around the Corner.</p>
                    </div>

                    <div className="relative flex items-center gap-2">
                        <Input className="pl-10 shadow-lg" type="text" placeholder="Search by Name, City and Restaurant" value={searchText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchText(e.target.value) }} />
                        <Search className="text-gray-500 absolute inset-y-2 left-2" />
                        <Button onClick={searchHandler} className="bg-color-button hover:bg-color-button-hover">Search</Button>
                    </div>
                    
                </div>

                <div className="">
                    <img className="object-cover w-full max-h-[500px]" src={HeroImage} alt="" />
                </div>

            </div>
        </>
    )
}

export default HeroSection
