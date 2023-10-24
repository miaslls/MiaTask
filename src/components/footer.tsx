import styles from './styles/footer.module.css';

import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer>
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://github.com/miaslls"
          target="_blank"
          title={t('a11y:title.link-github')}
        >
          @miaslls
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://fonts.google.com/specimen/Roboto+Mono"
          target="_blank"
          title={t('a11y:title.link-font')}
        >
          {t('font')}
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
      ৹
      <span className={styles.footer_link}>
        <Link
          className="text_link"
          href="https://remixicon.com"
          target="_blank"
          title={t('a11y:title.link-icon')}
        >
          {t('icons')}
          <i className="ri-external-link-line"></i>
        </Link>
      </span>
    </footer>
  );
}
