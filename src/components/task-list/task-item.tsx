import styles from './styles/task-item.module.css';

import { extendTask } from '@src/lib/format';
import { toggleTaskAction } from '@src/lib/actions';
import useTranslation from 'next-translate/useTranslation';
import useDeviceOrientation from '@hooks/useDeviceOrientation';

import type { Task } from '@prisma/client';
import type { ExtendedTask, OpenElement } from '@src/pages/index';

export type TaskItemProps = {
  task: Task;
  handleOpenElement(element?: OpenElement, task?: ExtendedTask): void;
};

export default function TaskItem({ task, handleOpenElement }: TaskItemProps) {
  const { t, lang } = useTranslation();
  const orientation = useDeviceOrientation();
  const extendedTask = extendTask(task, lang);

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
        onClick={() => toggleTaskAction({ id: task.id, action: 'complete', translate: t, lang })}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <button
        type="button"
        className={styles.task_preview}
        onClick={() => handleOpenElement('modal', extendedTask)}
        aria-label={t('a11y:aria.label.details')}
        title={t('a11y:title.details')}
      >
        <div className={styles.task_text}>{task.text}</div>

        <div className={styles.task_date}>
          {orientation === 'landscape' ? extendedTask.dateStringLong : extendedTask.dateStringShort}
          @ {extendedTask.timeString} {task.starred && <i className="ri-star-fill"></i>}
        </div>
      </button>
    </li>
  );
}
