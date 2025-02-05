// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     const systemDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
//     const initialTheme = storedTheme || (systemDark ? "dark" : "light");
//     setTheme(initialTheme);
//     document.documentElement.classList.add(initialTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.replace(theme, newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Use stored theme or default to system preference
  const [theme, setTheme] = useState("light");

  // Update document root class and persist to localStorage whenever theme changes
  useEffect(() => {
    // Remove both classes then add current theme
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
