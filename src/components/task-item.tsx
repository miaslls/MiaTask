import styles from './styles/task-item.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { Task } from '@prisma/client';
import { dismissableErrorToast } from '@/lib/toastUtils';

async function toggleCompleteTask(id: string) {
  const toastId = toast.loading('Loading...');

  const key_task = '/api/task';
  const key_complete = `/api/complete/${id}`;

  const response = await fetch(key_complete, {
    method: 'PATCH',
  });

  if (response.ok) {
    toast.success('Done!', { id: toastId });
    mutate(key_task);
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
}: {
  task: Task;
  activeTaskId: string | null;
  handleActiveTask(taskId: string): void;
}) {
  return (
    <li
      className={`${styles.task} ${task.starred && styles.task_starred} ${
        task.completed && styles.task_completed
      }`}
    >
      <div className={styles.task_icons}>
        <div className={styles.task_icon} onClick={() => toggleCompleteTask(task.id)}>
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </div>
        <div className={styles.task_icon} onClick={() => handleActiveTask(task.id)}>
          <i className="ri-more-2-fill"></i>
        </div>
      </div>

      {activeTaskId === task.id && (
        <div className={styles.task_options}>
          <div className={styles.task_icon}>
            <i className="ri-edit-line"></i>
          </div>
          <div className={styles.task_icon}>
            <i className="ri-delete-bin-2-line"></i>
          </div>
          <div className={styles.task_icon}>
            <i className="ri-star-line"></i>
          </div>
        </div>
      )}

      <div className={styles.task_text}>{task.text}</div>

      {task.starred && (
        <div className={styles.task_icon}>
          <i className="ri-star-fill"></i>
        </div>
      )}
    </li>
  );
}
