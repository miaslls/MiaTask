import styles from './styles/toggle-theme-button.module.css';

import useTranslation from 'next-translate/useTranslation';
import { useTheme } from '@components/context/theme-provider';

// html and styles adapted from https://webtips.dev/toggle-buttons-in-react ❗

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  const { t } = useTranslation();

  return (
    <label
      className={styles.toggle_theme_button}
      aria-label={t('a11y:title.toggle-dark')}
      title={t('a11y:title.toggle-dark')}
    >
      <input type="checkbox" defaultChecked={theme === 'dark'} onClick={toggleTheme} />
      <span></span>
      <strong>
        <i className={theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line'}></i>
      </strong>
    </label>
  );
}
