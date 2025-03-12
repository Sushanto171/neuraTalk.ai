"use client";
import { useEffect, useState } from "react";
const ThemeToggle = () => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
  }, [theme]);
  return (
    <div>
      <button onClick={() => setTheme(!theme)} className="btn rounded-md">
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
