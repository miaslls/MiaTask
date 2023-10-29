import styles from './styles/task-item.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@components/dismissable-error-toast';
import useTranslation from 'next-translate/useTranslation';
import useDeviceOrientation from '@hooks/useDeviceOrientation';

import { ChangeEvent } from 'react';
import { Task } from '@prisma/client';

async function toggleTaskAction(
  id: string,
  action: 'complete' | 'star',
  translate: CallableFunction,
  lang: string,
) {
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
  }
}

export type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { t, lang } = useTranslation('common');
  const orientation = useDeviceOrientation();

  const taskDate = new Date(task.updatedAt);
  const dateStringShort = taskDate.toLocaleDateString(lang, {
    day: '2-digit',
    month: '2-digit',
  });

  const dateStringLong = taskDate.toLocaleDateString(lang, {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const timeString = taskDate
    .toLocaleTimeString(lang, {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    })
    .toLowerCase()
    .split(' ')
    .join('');

  // if (task.id === taskToUpdate) {
  //   return (
  //     <UpdateTaskForm
  //       taskId={task.id}
  //       inputText={inputText}
  //       handleChange={handleChange}
  //       handleForm={handleForm}
  //     />
  //   );
  // }

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
        onClick={() => toggleTaskAction(task.id, 'complete', t, lang)}
        aria-label={t('a11y:aria.label.toggle-complete')}
        title={t('a11y:title.toggle-complete')}
      >
        <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
      </button>

      <div
        className={styles.task_preview}
        aria-label={t('a11y:aria.label.details')}
        title={t('a11y:title.details')}
      >
        <div className={styles.task_text}>{task.text}</div>

        <div className={styles.task_date}>
          {orientation === 'landscape' ? dateStringLong : dateStringShort} @ {timeString}
        </div>
      </div>

      {task.starred && (
        <button
          type="button"
          className={styles.task_icon + ' ' + styles.star_icon}
          onClick={() => toggleTaskAction(task.id, 'star', t, lang)}
          aria-label={t('a11y:aria.label.unstar')}
          title={t('a11y:title.unstar')}
        >
          <i className="ri-star-fill"></i>
        </button>
      )}
    </li>
  );
}
