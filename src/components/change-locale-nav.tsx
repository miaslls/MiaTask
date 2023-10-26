import styles from './styles/change-locale-nav.module.css';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import ISO6391 from 'iso-639-1';
import useTranslation from 'next-translate/useTranslation';

export default function ChangeLocaleNav() {
  const { t } = useTranslation('a11y');
  const { locales: availableLocales, locale: currentLocale, defaultLocale } = useRouter();

  useEffect(() => {
    if (currentLocale !== defaultLocale) {
      const date = new Date();
      const expireMs = 100 * 24 * 60 * 60 * 1000;
      date.setTime(date.getTime() + expireMs);
      document.cookie = `NEXT_LOCALE=${currentLocale};expires=${date.toUTCString()};path=/`;
    }
  }, [currentLocale, defaultLocale]);

  return (
    <nav className={styles.container}>
      <div className={styles.locales}>
        {availableLocales &&
          availableLocales.map((locale) => (
            <Link
              key={`change-lang-link--${locale}`}
              className={styles.link + (locale === currentLocale && ' ' + styles.current_locale)}
              href="/"
              locale={locale}
              title={ISO6391.getNativeName(locale)}
              aria-label={t('aria.label.change-locale', {
                locale: ISO6391.getName(locale),
              })}
            >
              {locale}
            </Link>
          ))}
      </div>

      <div className={styles.icon}>
        <i className="ri-global-line"></i>
      </div>
    </nav>
  );
}
