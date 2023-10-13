import styles from './styles/task-modal.module.css';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { dismissableErrorToast } from '@/lib/toastUtils';
import type { ShowModal } from './task-list';

async function removeTask(id: string, handleShowModal: CallableFunction) {
  handleShowModal(null);

  const toastId = toast.loading('Loading...');

  const tasklist = '/api/task';
  const key = `/api/task/${id}`;

  const response = await fetch(key, { method: 'DELETE' });

  if (response.ok) {
    toast.success('Task removed.', { id: toastId });
    mutate(tasklist);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export default function TaskModal({
  showModal,
  handleShowModal,
}: {
  showModal: ShowModal;
  handleShowModal(showModal: ShowModal | null): void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.quote}>
          <i className="ri-double-quotes-l"></i>
        </div>
        {showModal.task.text}
        <div className={styles.quote}>
          <i className="ri-double-quotes-r"></i>
        </div>
      </div>

      {showModal.type === 'delete' && (
        <>
          <div className={styles.confirm_delete}>
            <div className={styles.delete_text}>confirm delete?</div>

            <div className={styles.delete_icons}>
              <i
                className="ri-close-line"
                onClick={() => handleShowModal(null)}
                aria-label="Cancel delete"
              ></i>

              <i
                className="ri-check-line"
                onClick={() => removeTask(showModal.task.id, handleShowModal)}
                aria-label="Confirm delete"
              ></i>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
