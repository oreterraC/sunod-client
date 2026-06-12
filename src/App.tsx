import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/Theme";

import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import "./App.css";
import Playlists from "./pages/Playlists";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signUp" element={<Register />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/playlists" element={<Playlists />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
