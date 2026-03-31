import styles from './styles/footer.module.css';

import useTranslation from '../../../stubs/use-translation';
import ChangeLocaleNav from './change-locale-nav';

export type FooterProps = {
  availableLocales?: string[];
  currentLocale?: string;
  onLocaleChange?(locale: string): void;
};

export default function Footer({
  availableLocales = ['en', 'pt'],
  currentLocale = 'en',
  onLocaleChange,
}: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer>
      <nav className={styles.external_links}>
        <a className={styles.link} href="https://github.com/miaslls" target="_blank" title={t('a11y:title.link-github')} rel="noreferrer">
          @miaslls
          <i className="ri-external-link-line"></i>
        </a>
        •
        <a
          className={styles.link}
          href="https://fonts.google.com/specimen/Roboto+Mono"
          target="_blank"
          title={t('a11y:title.link-font')}
          rel="noreferrer"
        >
          {t('font')}
          <i className="ri-external-link-line"></i>
        </a>
        •
        <a className={styles.link} href="https://remixicon.com" target="_blank" title={t('a11y:title.link-icon')} rel="noreferrer">
          {t('icons')}
          <i className="ri-external-link-line"></i>
        </a>
      </nav>

      <ChangeLocaleNav
        availableLocales={availableLocales}
        currentLocale={currentLocale}
        onLocaleChange={onLocaleChange}
      />
    </footer>
  );
}

