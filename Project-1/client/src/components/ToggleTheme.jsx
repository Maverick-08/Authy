import React from "react";
import useTheme from "../Hooks/useTheme";

const ToggleTheme = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <div
      className="px-8 py-4 bg-sky-200 hover:bg-sky-300  dark:bg-blue-200 dark:hover:bg-blue-300 rounded-xl shadow-lg cursor-pointer flex justify-center items-center"
      onClick={toggleTheme}
    >
      <p className="text-2xl font-medium text-sky-700 dark:text-blue-700">
        Change Theme
      </p>
    </div>
  );
};

export default ToggleTheme;
