import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail, Phone, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userSignupSchema, type SignupInputState } from "@/Schema/userSchema";
import { useUserStore } from "../store/useUserStore";



const Signup = () => {

    const [input, setInput] = useState<SignupInputState>({
        fullName: "",
        email: "",
        password: "",
        contact: "",
    });

    const [errors, setErrors] = useState<Partial<SignupInputState>>({});
    const {signup, loading} = useUserStore();
    const navigate = useNavigate();

    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setInput({...input, [name]:value});
    };

    const signupSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        // Form Validation Check
        const result = userSignupSchema.safeParse(input);

        if (!result.success) {
            // const fieldErrors = result?.error?.formErrors?.fieldErrors;
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;
        }

        // Login API implementation Starts
        try {
          await signup(input);
          navigate("/verify-email");
        } catch (error) {
          console.log(error);
        }
    };

    return (
      <div className="flex items-center justify-center text-center min-h-screen w-screen">
        <form
          onSubmit={signupSubmitHandler}
          className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
        >

          <div className="my-8 text-center">
            <h1 className="font-bold text-2xl">ForkSquare - Signup Form</h1>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <User2 className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-xs text-red-500">{errors.fullName}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Contact"
                name="contact"
                value={input.contact}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors && (
                <span className="text-xs text-red-500">{errors.contact}</span>
              )}
            </div>
          </div>

          <div className="mb-10">
            {loading ? (
              <Button
                disabled
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Signup
              </Button>
            )}
          </div>

          <Separator />

          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          
        </form>
      </div>
    );
};

export default Signup;

