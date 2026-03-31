import styles from './styles/task-item.module.css';

import useTranslation from '../../stubs/use-translation';
import useDeviceOrientation from '../../hooks/use-device-orientation';
import type { UiTask } from '../../types';
import { fallbackTask, noop } from '../../mocks/fallbacks';

export type TaskItemProps = {
  task?: UiTask;
  handleOpenElement?(element?: 'modal', task?: UiTask): void;
  onToggleComplete?(id: string): void;
};

export default function TaskItem({
  task = fallbackTask,
  handleOpenElement = noop,
  onToggleComplete,
}: TaskItemProps) {
  const { t } = useTranslation();
  const orientation = useDeviceOrientation();

  return (
    <li
      className={
        styles.task +
        ' ' +
        (task.starred && styles.task_starred) +
        ' ' +
        (task.completed && styles.task_completed)
      }
    >
      <button
        type="button"
        className={styles.task_icon}
        onClick={() => onToggleComplete?.(task.id)}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <button
        type="button"
        className={styles.task_preview}
        onClick={() => handleOpenElement('modal', task)}
        aria-label={t('a11y:aria.label.details')}
        title={t('a11y:title.details')}
      >
        <div className={styles.task_text}>{task.text}</div>

        <div className={styles.task_date}>
          {orientation === 'landscape' ? task.dateStringLong : task.dateStringShort} @ {task.timeString}{' '}
          {task.starred && <i className="ri-star-fill"></i>}
        </div>
      </button>
    </li>
  );
}
