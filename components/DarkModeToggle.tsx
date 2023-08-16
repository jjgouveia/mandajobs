import { useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("mandaJobsTheme", "dark");
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}

export default DarkModeToggle;
