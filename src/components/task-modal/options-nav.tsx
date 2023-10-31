import styles from './styles/options-nav.module.css';

import useTranslation from 'next-translate/useTranslation';
import type { ExtendedTask } from '@src/pages/index';
import type { ToggleTaskActionParams } from '@components/task-list/task-item';

export type OptionsNavProps = {
  task: ExtendedTask;
  handleModalAction(params: ToggleTaskActionParams): void;
};

export default function OptionsNav({ task, handleModalAction }: OptionsNavProps) {
  const { t, lang } = useTranslation();

  return (
    <nav className={styles.options_nav}>
      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleModalAction({ id: task.id, action: 'complete', translate: t, lang })}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleModalAction({ id: task.id, action: 'star', translate: t, lang })}
        aria-label={t('a11y:aria.label.star')}
        title={t('a11y:title.star')}
      >
        <i className={task.starred ? 'ri-star-fill' : 'ri-star-line'}></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        aria-label={t('a11y:aria.label.edit')}
        title={t('a11y:title.edit')}
      >
        <i className="ri-edit-line"></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        aria-label={t('a11y:aria.label.delete')}
        title={t('a11y:title.delete')}
      >
        <i className="ri-delete-bin-2-line"></i>
      </button>
    </nav>
  );
}
