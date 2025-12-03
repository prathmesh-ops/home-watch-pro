import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  attribute?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  storageKey = "propertydoc-theme",
  attribute = "class",
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      attribute={attribute}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
