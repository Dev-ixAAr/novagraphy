"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    // attribute="class" විය යුතුයි (data-theme නෙවෙයි)
    <NextThemesProvider {...props} attribute="class"> 
      {children}
    </NextThemesProvider>
  );
}