import styles from './styles/task-item.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { Task } from '@prisma/client';
import { ShowModal } from './task-list';
import { dismissableErrorToast } from '@/lib/toastUtils';

async function toggleTaskProperty(
  id: string,
  property: 'complete' | 'star',
  handleActiveTask: CallableFunction,
) {
  handleActiveTask(null);
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

export default function TaskItem({
  task,
  activeTaskId,
  handleActiveTask,
  handleShowModal,
}: {
  task: Task;
  activeTaskId: string | null;
  handleActiveTask(taskId: string): void;
  handleShowModal(showModal: ShowModal): void;
}) {
  return (
    <li
      className={`${styles.task} ${task.starred && styles.task_starred} ${
        task.completed && styles.task_completed
      }`}
    >
      <div className={styles.task_icons}>
        <button
          type="button"
          className={styles.task_icon}
          onClick={() => toggleTaskProperty(task.id, 'complete', handleActiveTask)}
          aria-label="Toggle task completed"
        >
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </button>

        <button
          type="button"
          className={styles.task_icon}
          onClick={() => handleActiveTask(task.id)}
          aria-label="Show/hide task options"
        >
          <i className="ri-more-2-fill"></i>
        </button>
      </div>

      {activeTaskId === task.id && (
        <div className={styles.task_options}>
          <button
            type="button"
            className={styles.task_icon}
            onClick={() => handleShowModal({ type: 'delete', task })}
            aria-label="Delete task"
          >
            <i className="ri-delete-bin-2-line"></i>
          </button>

          {!task.starred && (
            <button
              type="button"
              className={styles.task_icon}
              onClick={() => toggleTaskProperty(task.id, 'star', handleActiveTask)}
              aria-label="Star task"
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
          onClick={() => toggleTaskProperty(task.id, 'star', handleActiveTask)}
          aria-label="Unstar task"
        >
          <i className="ri-star-fill"></i>
        </button>
      )}
    </li>
  );
}
