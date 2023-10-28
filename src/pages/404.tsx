import styles from '@src/styles/custom-errors.module.css';

import Head from 'next/head';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export default function Custom404() {
  const { t } = useTranslation('error-pages');

  return (
    <>
      <Head>
        <title>{'MiaTask - ' + t('404.page-title')}</title>
      </Head>

      <div className={styles.title}>
        <i className="ri-alert-line"></i>
        <div>{t('404.page-title')}</div>
      </div>

      <Link
        className={styles.link}
        href="/"
        aria-label={t('a11y:aria.label.go-home')}
        title={t('a11y:title.home')}
      >
        {t('404.link-text') + ' '}
        <i className="ri-arrow-go-back-line"></i>
      </Link>
    </>
  );
}
