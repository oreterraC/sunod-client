import { useState } from "react";
import { useTheme } from "../context/Theme";
import NavBar from "../components/NavBar";
import TrackGrid from "../components/TrackGrid";
import GenreList from "../components/GenreList";

const Home = () => {
  const { darkMode } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="grid grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[200px_1fr] min-h-screen">
        <NavBar
          onSearch={(text) => {
            setSearchText(text);
            setSelectedGenre(null);
          }}
          searchText={searchText}
        />
        <aside className="hidden lg:block bg-zinc-50 dark:bg-zinc-900 text-white p-4">
          <GenreList
            onSelectGenre={(id) => {
              setSelectedGenre(id);
              setSearchText("");
            }}
            selectedGenre={selectedGenre}
          />
        </aside>
        <TrackGrid searchText={searchText} selectedGenre={selectedGenre} />
      </div>
    </div>
  );
};

export default Home;
