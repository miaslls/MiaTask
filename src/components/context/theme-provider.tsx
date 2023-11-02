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
    throw new Error('Use ThemeProvider in a parent component');
  }

  return context;
}

export default function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const cookieString = document.cookie;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleMediaQuery(query: MediaQueryList | MediaQueryListEvent) {
      if (query.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }

    const themeCookie = getThemeCookie(cookieString);

    if (themeCookie) {
      if (themeCookie.value === 'dark' || themeCookie.value === 'light') {
        setTheme(themeCookie.value);
      }
    } else {
      handleMediaQuery(mediaQuery);
    }

    mediaQuery.addEventListener('change', handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQuery);
    };
  }, []);

  useEffect(() => {
    if (theme) {
      const body = document.querySelector('body') as HTMLBodyElement;

      if (theme === 'dark') {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }

      const date = new Date();
      const expireMs = 100 * 24 * 60 * 60 * 1000;
      date.setTime(date.getTime() + expireMs);
      document.cookie = `theme=${theme};expires=${date.toUTCString()};path=/`;
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
