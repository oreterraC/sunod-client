import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useState } from "react";

interface Properties {
  onSubmit: (email: string, password: string) => void;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordIcon = showPassword ? EyeSlashIcon : EyeIcon;

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center w-full max-w-sm mt-12">
        <img src={logo} className="h-10 w-auto" />
        <span className="mt-5 text-xl text-black font-semibold dark:text-white">
          Sign in to sunod
        </span>
        <form className="flex flex-col items-start mt-6 w-full">
          <label
            htmlFor="email"
            className="text-md text-black font-semibold dark:text-white"
          >
            Email adress
          </label>
          <input
            id="email"
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
            Sign in
          </button>
        </form>
        <span className="text-dark dark:text-white text-sm mt-5">
          New to sunod?
          <Link to="/signUp" className="text-sm text-fuchsia-600 ml-1">
            Create an account
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
