import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { signUp } from "../services/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PasswordIcon = showPassword ? EyeSlashIcon : EyeIcon;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const abortController = new AbortController();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const token = await signUp(email, password, abortController.signal);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("unknown error");
      form.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center w-full max-w-sm mt-12">
        <img src={logo} className="h-10 w-auto" />
        <span className="mt-5 text-xl text-black font-semibold dark:text-white">
          Sign up for sunod
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start mt-6 w-full"
        >
          <label
            htmlFor="email"
            className="text-md text-black font-semibold dark:text-white"
          >
            Email adress
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="border-1 border-zinc-700/70 dark:border-zinc-500/70 rounded-md mt-1
                        text-black dark:text-white h-10 w-full px-3 outline-none
                        focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30
                        transition-all duration-200"
          />
          <label
            htmlFor="password"
            className="text-md text-black font-semibold dark:text-white mt-4"
          >
            Password
          </label>
          <div className="relative w-full mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="border-1 border-zinc-700/70 dark:border-zinc-500/70 rounded-md mt-1
                        text-black dark:text-white h-10 w-full px-3 pr-10 outline-none
                        focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30
                        transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 ml-2"
            >
              <PasswordIcon className="h-5 w-5 text-black dark:text-white"></PasswordIcon>
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-600 rounded-md text-black dark:text-white font-semibold h-10 w-full mt-4"
          >
            Sign up
          </button>
          {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
        </form>
        <span className="text-dark dark:text-white text-sm mt-5">
          Already have an account?
          <Link to="/signIn" className="text-sm text-fuchsia-600 ml-1">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
