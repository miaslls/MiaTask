import styles from './styles/header.module.css';
import ToggleThemeButton from './toggle-theme-button';

export default function Header() {
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

      <ToggleThemeButton />
    </header>
  );
}
