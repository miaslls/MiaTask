import styles from './styles/toggle-theme-button.module.css';
import { useTheme } from './context/theme-provider';

// html and styles adapted from https://webtips.dev/toggle-buttons-in-react ❗

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      className={styles.toggle_theme_button}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <input type="checkbox" defaultChecked={theme === 'dark'} onClick={toggleTheme} />
      <span></span>
      <strong>
        <i className={theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'}></i>
      </strong>
    </label>
  );
}
