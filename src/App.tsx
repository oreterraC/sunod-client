import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TrackGrid from "./components/TrackGrid";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="grid grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[200px_1fr] min-h-screen">
        <NavBar
          darkMode={darkMode}
          onChange={() => setDarkMode((darkMode) => !darkMode)}
        />
        <aside className="hidden lg:block bg-gray-800 text-white p-4"></aside>
        <TrackGrid />
      </div>
    </div>
  );
}

export default App;
