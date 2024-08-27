import useTheme, { THEMES } from "@hooks/useTheme"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { cva } from "class-variance-authority"

const themeBgVariant = cva(
  "absolute bg-gray-100 rounded-full size-9 -z-10 transition-all duration-200 ease-out",
  {
    variants: {
      theme: {
        light: "left-[calc(0%+0.12rem)]",
        dark: "left-10",
        system: "left-[calc(100%-2.4rem)]",
      },
      isDark: {
        true: "bg-gray-600",
        false: "bg-gray-100",
      },
    },
    defaultVariants: {
      theme: "light",
      isDark: false,
    },
  }
)

const themeIcons = [SunIcon, MoonIcon, DesktopIcon]

const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <div className="relative border flex [&_svg]:size-5 [&>*]:p-2 [&>*]:cursor-pointer [&>*]:rounded-full gap-0.5 w-fit rounded-full p-0.5">
      <div className={themeBgVariant({ theme, isDark })}></div>
      {themeIcons.map((Icon, idx) => {
        return (
          <div key={THEMES[idx]} onClick={() => toggleTheme(THEMES[idx])}>
            <Icon />
          </div>
        )
      })}
    </div>
  )
}

export default ThemeToggle
