import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import logo from "../assets/logo.png";
import { signUp } from "../services/auth.api";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(10, { message: "Username must not exceed 10 characters " })
    .regex(/^\S+$/, { message: "Username cannot contain spaces" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .regex(/[A-Za-z]/, {
      message: "Password must contain at least 1 character",
    })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number" }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PasswordIcon = showPassword ? EyeSlashIcon : EyeIcon;

  const onSubmit = async (data: FormData) => {
    setError(null);

    const abortController = new AbortController();

    try {
      const token = await signUp(
        data.username,
        data.password,
        abortController.signal,
      );
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("unknown error");
      reset();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center w-full max-w-sm mt-12">
        <img src={logo} className="h-10 w-auto" />
        <span className="mt-5 text-xl text-black font-semibold dark:text-white">
          Sign up for sunod
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start mt-6 w-full"
        >
          <label
            htmlFor="username"
            className="text-md text-black font-semibold dark:text-white"
          >
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            name="username"
            type="text"
            className="border-1 border-zinc-700/70 dark:border-zinc-500/70 rounded-md mt-1
                        text-black dark:text-white h-10 w-full px-3 outline-none
                        focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30
                        transition-all duration-200"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          <label
            htmlFor="password"
            className="text-md text-black font-semibold dark:text-white mt-4"
          >
            Password
          </label>
          <div className="relative w-full mt-1">
            <input
              {...register("password")}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="border-1 border-zinc-700/70 dark:border-zinc-500/70 rounded-md mt-1
                        text-black dark:text-white h-10 w-full px-3 pr-10 outline-none
                        focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/30
                        transition-all duration-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
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
