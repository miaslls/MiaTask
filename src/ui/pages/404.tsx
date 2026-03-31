import styles from '../styles/custom-errors.module.css';
import useTranslation from '../stubs/use-translation';

export default function Custom404View() {
  const { t } = useTranslation('error-pages');

  return (
    <>
      <div className={styles.title}>
        <i className="ri-alert-line"></i>
        <div>{t('404.page-title')}</div>
      </div>

      <a className={styles.link} href="#" aria-label={t('a11y:aria.label.go-home')} title={t('a11y:title.home')}>
        {t('404.link-text') + ' '}
        <i className="ri-arrow-go-back-line"></i>
      </a>
    </>
  );
}

