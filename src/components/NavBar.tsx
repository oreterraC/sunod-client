import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

interface Properties {
  darkMode: boolean;
  onChange: () => void;
}

const NavBar = ({ darkMode, onChange }: Properties) => {
  const ThemeIcon = darkMode ? SunIcon : MoonIcon;

  return (
    <nav className="h-18 bg-gray-900 flex justify-between text-white lg:col-span-2 p-4">
      <img src={logo} className="h-10 w-auto" />
      <button onClick={onChange}>
        <ThemeIcon className="h-6 w-auto pr-3" />
      </button>
    </nav>
  );
};

export default NavBar;
