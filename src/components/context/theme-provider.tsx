import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { getThemeCookie } from '@root/src/lib/cookies';

type Theme = 'dark' | 'light' | undefined;

type ThemeState = {
  theme: Theme;
  toggleTheme(): void;
  setTheme(theme: Theme): void;
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
    const cookieString = document.cookie;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (cookieString.includes('theme')) {
      const themeCookie = getThemeCookie(cookieString);

      if (themeCookie.value === 'dark' || themeCookie.value === 'light') {
        setTheme(themeCookie.value);
      }
    } else {
      if (mediaQuery.matches) {
        console.log('User prefers Dark Mode');

        setTheme('dark');
      } else {
        setTheme('light');
      }
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

      const date = new Date();
      const expireMs = 100 * 24 * 60 * 60 * 1000;
      date.setTime(date.getTime() + expireMs);
      document.cookie = `theme=${theme};expires=${date.toUTCString()};path=/`;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
