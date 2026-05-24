import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

interface Properties {
  darkMode: boolean;
  onChange: () => void;
}

const NavBar = ({ darkMode, onChange }: Properties) => {
  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  return (
    <nav className="h-18 flex justify-between bg-zinc-50 dark:bg-zinc-900 lg:col-span-2 p-4">
      <img src={logo} className="h-10 w-auto" />
      <button onClick={onChange}>
        <ThemeIcon className="h-6 w-auto text-zinc-900 dark:text-zinc-50 pr-3" />
      </button>
    </nav>
  );
};

export default NavBar;
