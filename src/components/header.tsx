import styles from './styles/header.module.css';

import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import ToggleThemeButton from './toggle-theme-button';

export default function Header() {
  // const { locale: currentLocale } = useRouter();
  const { t, lang } = useTranslation();

  return (
    <header>
      <Link
        className={styles.title}
        href="/"
        locale={lang}
        aria-label={t('a11y:aria.label.go-home')}
        title={t('a11y:title.home')}
      >
        <div className={styles.title_logo}>
          <i className="ri-list-check-3"></i>
        </div>

        <h1>
          Mia<span>Task</span>
        </h1>
      </Link>

      <ToggleThemeButton />
    </header>
  );
}
