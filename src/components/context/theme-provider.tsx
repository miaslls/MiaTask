import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | undefined;

type ThemeState = {
  theme: Theme;
  toggleTheme(): void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function useTheme(): ThemeState {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Please, use ThemeProvider in a parent component');
  }

  return context;
}

export default function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mediaQuery.matches) {
      console.log('User prefers Dark Mode');

      setTheme('dark');
    } else {
      setTheme('light');
    }

    mediaQuery.addEventListener('change', (e) => {
      setTheme(e.matches ? 'dark' : 'light');

      console.log('Theme changed to match system');
    });
  }, []);

  useEffect(() => {
    if (theme) {
      const body = document.querySelector('body') as HTMLBodyElement;

      if (theme === 'dark') {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }

      console.log(`Theme set to "${theme}"`);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>
  );
}
