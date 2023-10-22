import styles from './styles/task-item.module.css';

import type { ShowModal } from '@/pages';
import { mutate } from 'swr';
import { ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '@prisma/client';
import { dismissableErrorToast } from '@/lib/toastUtils';
import UpdateTaskForm from './update-task-form';

async function toggleTaskProperty(
  id: string,
  property: 'complete' | 'star',
  handleShowOptions: CallableFunction,
) {
  handleShowOptions();
  const toastId = toast.loading('Loading...');

  const tasklist = '/api/task';
  const key = `/api/${property}/${id}`;

  const response = await fetch(key, {
    method: 'PATCH',
  });

  if (response.ok) {
    toast.success('Done!', { id: toastId });
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
          onClick={() => toggleTaskProperty(task.id, 'complete', handleShowOptions)}
          aria-label="Toggle complete task"
          title="Toggle complete"
        >
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </button>

        <button
          type="button"
          className={styles.task_icon}
          onClick={() => handleShowOptions(task)}
          aria-label="Show/hide task options"
          title="Options"
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
            aria-label="Edit task"
            title="Edit"
          >
            <i className="ri-edit-line"></i>
          </button>

          <button
            type="button"
            className={styles.task_icon}
            onClick={() => handleShowModal({ type: 'delete', task })}
            aria-label="Delete task"
            title="Delete"
          >
            <i className="ri-delete-bin-2-line"></i>
          </button>

          {!task.starred && (
            <button
              type="button"
              className={styles.task_icon}
              onClick={() => toggleTaskProperty(task.id, 'star', handleShowOptions)}
              aria-label="Star task"
              title="Star"
            >
              <i className="ri-star-line"></i>
            </button>
          )}
        </div>
      )}

      <div
        className={styles.task_text}
        onClick={() => handleShowModal({ type: 'details', task })}
        aria-label="Show task details"
      >
        {task.text}
      </div>

      {task.starred && (
        <button
          type="button"
          className={styles.task_icon}
          onClick={() => toggleTaskProperty(task.id, 'star', handleShowOptions)}
          aria-label="Unstar task"
          title="Unstar"
        >
          <i className="ri-star-fill"></i>
        </button>
      )}
    </li>
  );
}
