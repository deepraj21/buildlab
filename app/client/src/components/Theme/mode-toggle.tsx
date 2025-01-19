import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/Theme/theme-provider";

export function ModeToggle() {
    const { setTheme } = useTheme();
    const [theme, setLocalTheme] = useState(() => {
        const savedTheme = localStorage.getItem("vite-ui-theme");
        return savedTheme || "light";
    });

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setLocalTheme(newTheme);
        setTheme(newTheme);
    };

    return (
        <Button
            onClick={handleToggle}
            variant="ghost"
            size="icon"
            className="relative flex items-center justify-center transition-all rounded-full border "
        >
            <Sun
                className={`absolute transition-transform duration-300 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                    }`}
            />
            <Moon
                className={`absolute transition-transform duration-300 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

export default ModeToggle;
