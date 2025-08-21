import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userLoginSchema, type LoginInputState } from "@/Schema/userSchema";
import { useUserStore } from "@/store/useUserStore";



const Login = () => {

    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    // const {loading, login} = useUserStore();
    const [localLoading, setLocalLoading] = useState(false); // Local loading state
    const { login, isCheckingAuth } = useUserStore();
    const navigate = useNavigate();

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const loginSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        // Form Validation Check
        const result = userLoginSchema.safeParse(input);

        if (!result.success) {
            // const fieldErrors = result?.error?.formErrors?.fieldErrors;
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }

        setLocalLoading(true);
        // Login API implementation
        try {
            await login(input);
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLocalLoading(false); // Always reset local loading
        }
    };

    if (isCheckingAuth) {
      return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
    <div className="flex items-center justify-center text-center min-h-screen w-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >

        <div className="mb-4">
          <h1 className="font-bold text-2xl text-center">ForkSquare</h1>
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

        <div className="mb-10">
          {localLoading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        <Separator />
        
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>

      </form>
    </div>
  );

};

export default Login;
