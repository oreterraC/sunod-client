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
      <div className="flex items-center gap-2 h-full">
        <Link
          to="/playlists"
          className="flex items-center justify-center text-md text-zinc-800/80 dark:text-zinc-200/80
                      hover:text-zinc-800 hover:dark:text-zinc-200"
        >
          Playlists
        </Link>
        {!session && (
          <Link
            to="/signIn"
            className="flex items-center justify-center w-15 text-md text-zinc-800/80 dark:text-zinc-200/80
                        hover:text-zinc-800 hover:dark:text-zinc-200
                        border-1 border-zinc-800/80 dark:border-zinc-200
                        hover:border-zinc-800 hover:dark:border-zinc-200 rounded-md ml-3"
          >
            Sign in
          </Link>
        )}
      </div>
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
        <ThemeIcon
          className="h-6 w-auto text-zinc-800/80 dark:text-zinc-200/80
                                hover:text-zinc-800 hover:dark:text-zinc-200 px-3"
        />
      </button>
    </nav>
  );
};

export default NavBar;
