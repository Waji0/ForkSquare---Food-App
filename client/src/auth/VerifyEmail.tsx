import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { FormEvent } from 'react';



const VerifyEmail = () => {

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    const navigate = useNavigate();
    const { loading, verifyEmail } = useUserStore();

    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value == "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }

        // Move to next input box
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }

    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }

    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <div className="flex flex-col gap-5 md:border md:p-10 p-8 w-full max-w-md rounded-lg mx-4 border border-gray-400">

                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Verify Email</h1>
                    <p className="text-sm text-gray-600">Enter 6 digit code send to your Email Address</p>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="flex justify-between">
                        {
                            otp.map((letter: string, idx: number) => (
                                <Input
                                    key={idx}
                                    type="text"
                                    ref={(element: HTMLInputElement) => { inputRef.current[idx] = element }}
                                    maxLength={1}
                                    value={letter}
                                    // onChange={(e: React.ComponentProps<"input">) => handleChange(idx, e.target.value)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}

                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { handleKeyDown(idx, e) }}
                                    className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus-outline-none focus-ring-2 focus-ring-indigo-500"
                                />
                            ))
                        }
                    </div>

                    <div className="mb-4 mt-4 text-center">
                        {
                            loading ? <Button disabled className="w-full bg-color-button hover:bg-color-button-hover"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button type="submit" className="w-full bg-color-button hover:bg-color-button-hover">Verify</Button>
                        }
                    </div>

                </form>



            </div>
        </div>
    );

};

export default VerifyEmail
