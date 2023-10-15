import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [backToTop, setBackToTop] = useState(false);

  function handleScroll() {
    if (window.scrollY > 600) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  }

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollUp}
      aria-label="Go to Top"
      type="button"
      className={clsx(
        "fixed right-6 rounded-lg border border-slate-100 bg-zinc-600 p-2 text-5xl text-slate-100 shadow transition-all duration-300 hover:bg-zinc-700 focus:ring focus:ring-zinc-300 z-50",
        [
          { "bottom-6 opacity-80": backToTop },
          { "-bottom-20 opacity-0": !backToTop },
        ]
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
