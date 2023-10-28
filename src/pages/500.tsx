import styles from '@src/styles/custom-errors.module.css';

import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

export default function Custom500() {
  const { t } = useTranslation('error-pages');

  return (
    <>
      <Head>
        <title>{'MiaTask - ' + t('500.page-title')}</title>
      </Head>

      <div className={styles.title}>
        <i className="ri-alert-line"></i>
        <div>{t('500.page-title')}</div>
      </div>

      <div className={styles.instructions}>{t('500.instructions') + ' '}</div>
    </>
  );
}
