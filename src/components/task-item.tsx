import styles from './styles/task-item.module.css';

import type { ShowModal } from '@/pages';
import { mutate } from 'swr';
import { ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '@prisma/client';
import { dismissableErrorToast } from '@/components/dismissable-error-toast';
import UpdateTaskForm from './update-task-form';
import useTranslation from 'next-translate/useTranslation';

async function toggleTaskAction(
  id: string,
  action: 'complete' | 'star',
  handleShowOptions: CallableFunction,
  translate: CallableFunction,
) {
  handleShowOptions();
  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const key = `${tasklist}/${id}/${action}`;

  const response = await fetch(key, {
    method: 'PATCH',
  });

  if (response.ok) {
    toast.success(translate('done'), { id: toastId });
    mutate(tasklist);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export type TaskItemProps = {
  task: Task;
  showTaskOptions: Task | null;
  handleShowOptions(task?: Task): void;
  handleShowModal(showModal: ShowModal): void;
  inputText: string;
  taskToUpdate: string | null;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleForm(task?: Task): void;
};

export default function TaskItem({
  task,
  showTaskOptions,
  handleShowOptions,
  handleShowModal,
  inputText,
  taskToUpdate,
  handleChange,
  handleForm,
}: TaskItemProps) {
  const { t } = useTranslation('common');

  if (task.id === taskToUpdate) {
    return (
      <UpdateTaskForm
        taskId={task.id}
        inputText={inputText}
        handleChange={handleChange}
        handleForm={handleForm}
      />
    );
  }

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
      <div className={styles.task_icons}>
        <button
          type="button"
          className={styles.task_icon}
          onClick={() => toggleTaskAction(task.id, 'complete', handleShowOptions, t)}
          aria-label={t('a11y:aria.label.toggle-complete')}
          title={t('a11y:title.toggle-complete')}
        >
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </button>

        <button
          type="button"
          className={styles.task_icon}
          onClick={() => handleShowOptions(task)}
          aria-label={t('a11y:aria.label.options')}
          title={t('a11y:title.options')}
        >
          <i className="ri-more-2-fill"></i>
        </button>
      </div>

      {showTaskOptions === task && (
        <div className={styles.task_options}>
          <button
            type="button"
            className={styles.task_icon}
            onClick={() => handleForm(task)}
            aria-label={t('a11y:aria.label.edit')}
            title={t('a11y:title.edit')}
          >
            <i className="ri-edit-line"></i>
          </button>

          <button
            type="button"
            className={styles.task_icon}
            onClick={() => handleShowModal({ type: 'delete', task })}
            aria-label={t('a11y:aria.label.delete')}
            title={t('a11y:title.delete')}
          >
            <i className="ri-delete-bin-2-line"></i>
          </button>

          {!task.starred && (
            <button
              type="button"
              className={styles.task_icon}
              onClick={() => toggleTaskAction(task.id, 'star', handleShowOptions, t)}
              aria-label={t('a11y:aria.label.star')}
              title={t('a11y:title.star')}
            >
              <i className="ri-star-line"></i>
            </button>
          )}
        </div>
      )}

      <div
        className={styles.task_text}
        onClick={() => handleShowModal({ type: 'details', task })}
        aria-label={t('a11y:aria.label.details')}
        title={t('a11y:title.details')}
      >
        {task.text}
      </div>

      {task.starred && (
        <button
          type="button"
          className={styles.task_icon}
          onClick={() => toggleTaskAction(task.id, 'star', handleShowOptions, t)}
          aria-label={t('a11y:aria.label.unstar')}
          title={t('a11y:title.unstar')}
        >
          <i className="ri-star-fill"></i>
        </button>
      )}
    </li>
  );
}
