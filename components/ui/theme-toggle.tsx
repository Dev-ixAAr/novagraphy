"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Hydration Error මඟහරවා ගැනීමට
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }} // පොඩි Zoom එකක්
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        fixed bottom-8 right-8 z-50 
        flex h-12 w-12 items-center justify-center rounded-full 
        border border-white/10 bg-black/20 backdrop-blur-xl 
        shadow-[0_0_20px_rgba(0,0,0,0.3)]
        transition-colors hover:border-electric-blue/50 hover:bg-black/40
        group cursor-pointer
      "
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dark Mode Icon */}
            <Moon className="h-5 w-5 text-electric-blue drop-shadow-[0_0_5px_rgba(45,225,252,0.5)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
             {/* Light Mode Icon (Dark color for contrast) */}
            <Sun className="h-5 w-5 text-orange-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Button එක වටේට පොඩි Glow Effect එකක් */}
      <div className="absolute inset-0 -z-10 rounded-full bg-electric-blue opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-20" />
    </motion.button>
  );
}