import { useRef } from "react";
import { LuSearch } from "react-icons/lu";

interface Properties {
  onSearch: (searchText: string) => void;
  searchText: string;
}

const SearchInput = ({ onSearch, searchText }: Properties) => {
  const reference = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full px-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="flex items-center gap-2 w-full rounded-full
                    bg-zinc-200/60 dark:bg-zinc-800/60
                    hover:bg-zinc-200 dark:hover:bg-zinc-800
                    border-2 border-transparent focus-within:border-zinc-800 dark:focus-within:border-zinc-300
                    transition-all duration-200"
      >
        <button
          onClick={() => {
            reference.current?.focus();
          }}
          className="text-zinc-500 pl-4 flex items-center hover:scale-110 transition duration-100 cursor-pointer"
        >
          <LuSearch />
        </button>
        <input
          ref={reference}
          value={searchText}
          onChange={(event) => onSearch(event.target.value)}
          type="text"
          placeholder="Search tracks..."
          className="w-full py-2 px-4 text-zinc-900 dark:text-zinc-50 outline-none rounded-full"
        ></input>
      </form>
    </div>
  );
};

export default SearchInput;
