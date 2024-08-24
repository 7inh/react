import { useState } from "react"

export const THEMES = ["light", "dark", "system"] as const
export type Theme = (typeof THEMES)[number]

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const currentTheme =
      window.document.documentElement.getAttribute("class") || "light"
    return currentTheme as Theme
  })

  const toggleTheme = (theme: Theme) => {
    setTheme(theme)
    if (theme === "system") {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? window.document.documentElement.setAttribute("class", "dark")
        : window.document.documentElement.setAttribute("class", "light")
      return
    } else window.document.documentElement.setAttribute("class", theme)
  }

  return {
    theme,
    isDark: window.document.documentElement.classList.contains("dark"),
    toggleTheme,
  }
}

export default useTheme
