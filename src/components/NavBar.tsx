import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/Theme";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";

interface Properties {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, searchText }: Properties) => {
  const { darkMode, toggleDarkMode } = useTheme();

  const menu = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const session = localStorage.getItem("token");

  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-18 flex justify-between bg-zinc-50 dark:bg-zinc-900 lg:col-span-2 p-4">
      <img src={logo} alt="" className="h-10 w-auto" />
      <SearchInput onSearch={onSearch} searchText={searchText} />
      {!session && (
        <Link
          to="/signIn"
          className="flex items-center justify-center rounded-full w-25 text-lg text-fuchsia-500
                    border-2 border-fuchsia-500/0 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 hover:scale-105
                    transition-all duration-200"
        >
          Sign in
        </Link>
      )}
      {session && (
        <div ref={menu} className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="h-10 w-10 flex items-center justify-center"
          >
            <UserCircleIcon className="h-8 w-8 text-fuchsia-500 cursor-pointer" />
          </button>
          {open && (
            <div
              className="absolute right-0 mt-2 w-48 bg-zinc-100 dark:bg-zinc-800 shadow-lg rounded-md
                          border-1 border-zinc-300 dark:border-zinc-600"
            >
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="flex items-center gap-2 p-2 text-red-500 w-full cursor-pointer"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Sign out
              </button>
            </div>
          )}
        </div>
      )}
      <button onClick={toggleDarkMode}>
        <ThemeIcon className="h-6 w-auto text-zinc-900 dark:text-zinc-50 px-3" />
      </button>
    </nav>
  );
};

export default NavBar;
