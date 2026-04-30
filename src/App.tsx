import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NyangNyangDescription from "./pages/NyangNyangDescription";
import NewsDetail from "./pages/NewsDetail";
import Store from "./pages/Store";
import License from "./pages/License";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [isSeasonal] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Navbar theme={theme} setTheme={setTheme} isSeasonal={isSeasonal} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<NyangNyangDescription />} />
            <Route path="/news" element={<NewsDetail />} />
            <Route path="/store" element={<Store />} />
            <Route path="/license" element={<License />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
