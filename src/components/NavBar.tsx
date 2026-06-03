import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import SearchInput from "./SearchInput";

interface Properties {
  darkMode: boolean;
  onChange: () => void;
  onSearch: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ darkMode, onChange, onSearch, searchText }: Properties) => {
  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  return (
    <nav className="h-18 flex justify-between bg-zinc-50 dark:bg-zinc-900 lg:col-span-2 p-4">
      <img src={logo} className="h-10 w-auto" />
      <SearchInput onSearch={onSearch} searchText={searchText} />
      <Link
        to="/signIn"
        className="flex items-center justify-center rounded-full w-25 text-lg text-fuchsia-500
                    border-2 border-fuchsia-500/0 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 hover:scale-105
                    transition-all duration-200"
      >
        Sign in
      </Link>
      <button onClick={onChange}>
        <ThemeIcon className="h-6 w-auto text-zinc-900 dark:text-zinc-50 px-3" />
      </button>
    </nav>
  );
};

export default NavBar;
