import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingDots from "./LoadingDots";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [helper, setHelper] = useState("light");
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => {
    console.log("toggleDarkMode");

    setDarkMode((prevMode) => !prevMode);
    const theme = document.documentElement.classList[0];

    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("mandaJobsTheme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("mandaJobsTheme", "dark");
    }
  };

  useEffect(() => {
    setLoading(false);
    return setHelper(localStorage.getItem("mandaJobsTheme")!);
  }, [darkMode]);

  return (
    <>
      {loading ? (
        <LoadingDots color="#000" />
      ) : (
        <button id="toggleBtn" onClick={toggleDarkMode}>
          {helper === "light" ? (
            <Image src="./moon.svg" width={32} height={32} alt="Modo Escuro" />
          ) : (
            <Image src="./sun.svg" width={32} height={32} alt="Modo Claro" />
          )}
        </button>
      )}
    </>
  );
}

export default DarkModeToggle;
