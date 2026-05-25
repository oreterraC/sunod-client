import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TrackGrid from "./components/TrackGrid";
import GenreList from "./components/GenreList";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [searchText, setSearchText] = useState("eminem");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="grid grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[200px_1fr] min-h-screen">
        <NavBar
          darkMode={darkMode}
          onChange={() => setDarkMode((previous) => !previous)}
          onSearch={(text) => {
            setSearchText(text);
          }}
        />
        <aside className="hidden lg:block bg-zinc-50 dark:bg-zinc-900 text-white p-4">
          <GenreList />
        </aside>
        <TrackGrid searchText={searchText} />
      </div>
    </div>
  );
}

export default App;
