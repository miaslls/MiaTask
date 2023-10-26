import styles from './styles/footer.module.css';
import ChangeLocaleNav from './change-locale-nav';

import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer>
      <nav className={styles.external_links}>
        <Link
          className={styles.link}
          href="https://github.com/miaslls"
          target="_blank"
          title={t('a11y:title.link-github')}
        >
          @miaslls
          <i className="ri-external-link-line"></i>
        </Link>
        ৹
        <Link
          className={styles.link}
          href="https://fonts.google.com/specimen/Roboto+Mono"
          target="_blank"
          title={t('a11y:title.link-font')}
        >
          {t('font')}
          <i className="ri-external-link-line"></i>
        </Link>
        ৹
        <Link
          className={styles.link}
          href="https://remixicon.com"
          target="_blank"
          title={t('a11y:title.link-icon')}
        >
          {t('icons')}
          <i className="ri-external-link-line"></i>
        </Link>
      </nav>

      <ChangeLocaleNav />
    </footer>
  );
}
