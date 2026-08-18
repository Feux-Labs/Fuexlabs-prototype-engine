"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  function toggle() {
    const next = isLight ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("feuxlabs-theme", next);
    setIsLight(next === "light");
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light/dark theme">
      {isLight ? <MoonIcon size={16} /> : <SunIcon size={16} />}
    </button>
  );
}
