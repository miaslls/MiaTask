import styles from './styles/header.module.css';

import useTranslation from '../../../stubs/use-translation';
import ToggleThemeButton from './toggle-theme-button';

export type HeaderProps = {
  homeHref?: string;
};

export default function Header({ homeHref = '#' }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header>
      <a className={styles.title} href={homeHref} aria-label={t('a11y:aria.label.go-home')} title={t('a11y:title.home')}>
        <div className={styles.title_logo}>
          <i className="ri-list-check-3"></i>
        </div>

        <h1>
          Mia<span>Task</span>
        </h1>
      </a>

      <ToggleThemeButton />
    </header>
  );
}

