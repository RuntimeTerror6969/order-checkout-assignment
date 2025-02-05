"use client";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleTheme}
        className="p-3 text-xl rounded-full bg-gray-200 dark:bg-gray-700"
      >
        Toggle Theme {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
