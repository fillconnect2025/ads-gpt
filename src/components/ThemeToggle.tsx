
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial theme
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      updateLogoForDarkMode(true);
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      updateLogoForDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      updateLogoForDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      updateLogoForDarkMode(false);
    }
  };
  
  // Function to update logo based on theme
  const updateLogoForDarkMode = (isDark: boolean) => {
    // Find all logo images by a common class or data attribute
    const logoElements = document.querySelectorAll('img[alt="Ads-GPT Logo"]');
    
    logoElements.forEach(img => {
      const imgElement = img as HTMLImageElement;
      if (isDark) {
        // Use dark mode logo
        imgElement.src = '/uploads/e73c30b4-497e-4698-8624-51e217934707.png';
      } else {
        // Use light mode logo
        imgElement.src = '/uploads/e73c30b4-497e-4698-8624-51e217934707.png';
      }
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
