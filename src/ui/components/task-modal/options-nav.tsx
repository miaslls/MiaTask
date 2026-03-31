import styles from './styles/modal-element.module.css';

import useTranslation from '../../stubs/use-translation';
import type { UiTask, OpenModalElement, TaskActionParams } from '../../types';
import { fallbackTask, noop } from '../../mocks/fallbacks';

export type OptionsNavProps = {
  task?: UiTask;
  handleModalAction?(params: TaskActionParams): void;
  handleOpenModalElement?(element: OpenModalElement): void;
};

export default function OptionsNav({
  task = fallbackTask,
  handleModalAction = noop,
  handleOpenModalElement = noop,
}: OptionsNavProps) {
  const { t } = useTranslation();

  return (
    <nav className={styles.options_nav}>
      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleModalAction({ id: task.id, action: 'complete' })}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleOpenModalElement('update')}
        aria-label={t('a11y:aria.label.update')}
        title={t('a11y:title.update')}
      >
        <i className="ri-edit-line"></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleOpenModalElement('delete')}
        aria-label={t('a11y:aria.label.delete')}
        title={t('a11y:title.delete')}
      >
        <i className="ri-delete-bin-2-line"></i>
      </button>

      <button
        type="button"
        className={styles.button + ' ' + styles.nav_button}
        onClick={() => handleModalAction({ id: task.id, action: 'star' })}
        aria-label={t('a11y:aria.label.star')}
        title={t('a11y:title.star')}
      >
        <i className={task.starred ? 'ri-star-fill' : 'ri-star-line'}></i>
      </button>
    </nav>
  );
}
