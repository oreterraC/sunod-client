import { useRef } from "react";
import { LuSearch } from "react-icons/lu";

interface Properties {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Properties) => {
  const reference = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full px-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (reference.current) onSearch(reference.current.value);
        }}
        className="flex items-center gap-2 w-full px-4 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus-within:ring-2 dark:focus-within:ring-zinc-300 focus-within:ring-zinc-800"
      >
        <span className="text-zinc-500 flex items-center">
          <LuSearch />
        </span>
        <input
          ref={reference}
          type="text"
          placeholder="Search tracks..."
          className="w-full py-2 bg-transparent outline-none text-black dark:text-white placeholder-zinc-700 dark:placeholder-zinc-400"
        ></input>
      </form>
    </div>
  );
};

export default SearchInput;
