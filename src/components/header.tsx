import styles from './styles/header.module.css';
import { useTheme } from './context/theme-provider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className={styles.title}>
        <div className={styles.title_logo}>
          <i className="ri-list-check-3"></i>
        </div>

        <h1>
          Mia<span>Task</span>
        </h1>
      </div>

      {/* 🔻 component and styles adapted from https://webtips.dev/toggle-buttons-in-react ❗ */}

      <label className={styles.toggle_theme_button}>
        <input type="checkbox" defaultChecked={theme === 'dark'} onClick={toggleTheme} />
        <span></span>
        <strong>
          <i className="ri-moon-line"></i>
        </strong>
      </label>
    </header>
  );
}
