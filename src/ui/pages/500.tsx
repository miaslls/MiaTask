import styles from '../styles/custom-errors.module.css';
import useTranslation from '../stubs/use-translation';

export default function Custom500View() {
  const { t } = useTranslation('error-pages');

  return (
    <>
      <div className={styles.title}>
        <i className="ri-alert-line"></i>
        <div>{t('500.page-title')}</div>
      </div>

      <div className={styles.instructions}>{t('500.instructions') + ' '}</div>
    </>
  );
}

