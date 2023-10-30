import styles from './styles/task-item.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@src/lib/toast';
import { extendTask } from '@src/lib/format';
import useTranslation from 'next-translate/useTranslation';
import useDeviceOrientation from '@hooks/useDeviceOrientation';

import type { Task } from '@prisma/client';
import type { ExtendedTask, OpenElement } from '@src/pages/index';

export type ToggleTaskActionParams = {
  id: string;
  action: 'complete' | 'star';
  translate: CallableFunction;
  lang: string;
};

// extract to lib/actions ❓
export async function toggleTaskAction({
  id,
  action,
  translate,
  lang,
}: ToggleTaskActionParams): Promise<ExtendedTask | null> {
  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const key = `${tasklist}/${id}/${action}`;

  const response = await fetch(key, {
    method: 'PATCH',
    headers: { 'Accept-Language': lang },
  });

  if (response.ok) {
    toast.success(translate('done'), { id: toastId });
    mutate([tasklist, lang]);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
    return null;
  }

  const responseTask = await response.json().then((r) => r.task);

  return extendTask(responseTask, lang);
}

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
        className={styles.task_icon + ' ' + styles.checkbox_icon}
        onClick={() => toggleTaskAction({ id: task.id, action: 'complete', translate: t, lang })}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <div
        className={styles.task_preview}
        onClick={() => handleOpenElement('modal', extendedTask)}
        aria-label={t('a11y:aria.label.details')}
        title={t('a11y:title.details')}
      >
        <div className={styles.task_text}>{task.text}</div>

        <div className={styles.task_date}>
          {orientation === 'landscape' ? extendedTask.dateStringLong : extendedTask.dateStringShort}{' '}
          @ {extendedTask.timeString}
        </div>
      </div>

      {task.starred && (
        <button
          type="button"
          className={styles.task_icon + ' ' + styles.star_icon}
          onClick={() => toggleTaskAction({ id: task.id, action: 'star', translate: t, lang })}
          aria-label={t('a11y:aria.label.star')}
          title={t('a11y:title.star')}
        >
          <i className="ri-star-fill"></i>
        </button>
      )}
    </li>
  );
}
