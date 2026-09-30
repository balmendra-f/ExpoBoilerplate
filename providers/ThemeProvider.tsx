import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RouterThemeProvider,
} from "expo-router";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme === "dark" || storedTheme === "light") {
          setColorScheme(storedTheme);
          setIsDarkMode(storedTheme === "dark");
        } else {
          setIsDarkMode(colorScheme === "dark");
        }
      } catch (e) {
        console.error("Failed to load theme.");
      }
    };
    loadTheme();
  }, [colorScheme, setColorScheme]);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setColorScheme(newTheme);
    setIsDarkMode(!isDarkMode);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (e) {
      console.error("Failed to save theme.");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <RouterThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        {children}
      </RouterThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
