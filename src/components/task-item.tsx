import styles from './task-item.module.css';
import { Task } from '@prisma/client';

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li
      className={`${styles.task} ${task.starred && styles.task_starred} ${
        task.completed && styles.task_completed
      }`}
    >
      <div className={styles.task_icons}>
        <div className={styles.task_icon}>
          <i className={task.completed ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}></i>
        </div>
        <div className={styles.task_icon}>
          <i className="ri-more-2-fill"></i>
        </div>
      </div>

      <div className={styles.task_text}>{task.text}</div>

      {task.starred && (
        <div className={styles.task_icon}>
          <i className="ri-star-fill"></i>
        </div>
      )}
    </li>
  );
}
