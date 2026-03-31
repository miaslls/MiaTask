import styles from './styles/change-locale-nav.module.css';

import useTranslation from '../../../stubs/use-translation';

export type ChangeLocaleNavProps = {
  availableLocales?: string[];
  currentLocale?: string;
  onLocaleChange?(locale: string): void;
};

export default function ChangeLocaleNav({
  availableLocales = ['en', 'pt'],
  currentLocale = 'en',
  onLocaleChange,
}: ChangeLocaleNavProps) {
  const { t } = useTranslation('a11y');

  return (
    <nav className={styles.container}>
      <div className={styles.locales}>
        {availableLocales.map((locale) => (
          <a
            key={`change-lang-link--${locale}`}
            className={locale === currentLocale ? styles.current_locale : undefined}
            href="#"
            title={locale.toUpperCase()}
            aria-label={t('aria.label.change-locale', {
              locale: locale.toUpperCase(),
            })}
            onClick={(e) => {
              e.preventDefault();
              onLocaleChange?.(locale);
            }}
          >
            {locale}
          </a>
        ))}
      </div>

      <div className={styles.icon}>
        <i className="ri-global-line"></i>
      </div>
    </nav>
  );
}

