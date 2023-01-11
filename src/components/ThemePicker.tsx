import { useState } from "react";

// prettier-ignore
const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
const userSelectedTheme = localStorage.getItem("theme");

function setDarkMode() {
  document.body.classList.add("dark");
  document.body.classList.remove("light");
}

function setLightMode() {
  document.body.classList.add("light");
  document.body.classList.remove("dark");
}

function mediaQueryListener(e: MediaQueryListEvent) {
  e.matches ? setDarkMode() : setLightMode();
}

function setTheme(theme: "light" | "dark" | "system") {
  switch (theme) {
    case "dark":
      setDarkMode();
      darkModePreference.removeEventListener("change", mediaQueryListener);
      break;

    case "light":
      setLightMode();
      darkModePreference.removeEventListener("change", mediaQueryListener);
      break;

    case "system":
      darkModePreference.matches ? setDarkMode() : setLightMode();
      darkModePreference.addEventListener("change", mediaQueryListener);
      break;

    default:
      break;
  }
}

if (userSelectedTheme == "dark") {
  setTheme("dark");
} else if (userSelectedTheme == "light") {
  setTheme("light");
} else {
  setTheme("system");
}

export function ThemePicker() {
  const [selectedTheme, setSelectedTheme] = useState(
    userSelectedTheme ?? "system"
  );

  function handleThemeSelect(theme: string) {
    localStorage.setItem("theme", theme);
    setSelectedTheme(theme);
    setTheme(theme as "light" | "dark" | "system");
  }

  return (
    <form>
      <label style={{ display: "inline-block", marginRight: "1em" }}>
        Theme
      </label>
      <select
        value={selectedTheme}
        onChange={(e) => handleThemeSelect(e.target.value)}
        className="button"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </form>
  );
}
