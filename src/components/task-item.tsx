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
        <div
          className={styles.task_icon}
          onClick={() => toggleTaskProperty(task.id, 'complete', handleActiveTask)}
        >
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </div>
        <div className={styles.task_icon} onClick={() => handleActiveTask(task.id)}>
          <i className="ri-more-2-fill"></i>
        </div>
      </div>

      {activeTaskId === task.id && (
        <div className={styles.task_options}>
          <div
            className={styles.task_icon}
            onClick={() => handleShowModal({ type: 'detail', task })}
          >
            <i className="ri-eye-2-line"></i>
          </div>
          <div className={styles.task_icon}>
            <i className="ri-edit-line"></i>
          </div>
          <div
            className={styles.task_icon}
            onClick={() => handleShowModal({ type: 'delete', task })}
          >
            <i className="ri-delete-bin-2-line"></i>
          </div>
          {!task.starred && (
            <div
              className={styles.task_icon}
              onClick={() => toggleTaskProperty(task.id, 'star', handleActiveTask)}
            >
              <i className="ri-star-line"></i>
            </div>
          )}
        </div>
      )}

      <div className={styles.task_text}>{task.text}</div>

      {task.starred && (
        <div
          className={styles.task_icon}
          onClick={() => toggleTaskProperty(task.id, 'star', handleActiveTask)}
        >
          <i className="ri-star-fill"></i>
        </div>
      )}
    </li>
  );
}
