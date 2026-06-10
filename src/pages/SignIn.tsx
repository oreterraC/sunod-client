import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { signIn } from "../services/auth.api";

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const PasswordIcon = showPassword ? EyeSlashIcon : EyeIcon;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const abortController = new AbortController();
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const token = await signIn(username, password, abortController.signal);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("unknown error");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center w-full max-w-sm mt-12">
        <img src={logo} className="h-10 w-auto" />
        <span className="mt-5 text-xl text-black font-semibold dark:text-white">
          Sign in to sunod
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start mt-6 w-full"
        >
          <label
            htmlFor="username"
            className="text-md text-black font-semibold dark:text-white"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
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
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
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
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
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
