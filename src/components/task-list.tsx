import styles from './styles/task-modal.module.css';

import useSWR, { mutate } from 'swr';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Task } from '@prisma/client';
import { dismissableErrorToast } from '@/lib/toastUtils';

import TaskItem from './task-item';
import Modal from './modal';

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

export type ShowModal = {
  type: 'details' | 'delete';
  task: Task;
} | null;

export default function TaskList() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<ShowModal>(null);

  const handleShowModal = (showModal: ShowModal) => {
    setActiveTaskId(null);
    setShowModal(showModal);
  };

  const handleActiveTask = (taskId: string | null) => {
    if (activeTaskId === taskId) {
      setActiveTaskId(null);
    } else {
      setActiveTaskId(taskId);
    }
  };

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/task', fetcher);

  if (error)
    return (
      <div className="tasklist_alert">
        <i className="ri-alert-line"></i> Failed to load
      </div>
    );

  if (isLoading)
    return (
      <div className="tasklist_alert">
        <i className="ri-loop-right-fill"></i> Loading...
      </div>
    );

  return (
    <>
      {data.tasks.length === 0 ? (
        <div className="tasklist_alert">
          <i className="ri-alert-line"></i> Tasklist empty
        </div>
      ) : (
        data.tasks.map((task: Task) => (
          <TaskItem
            task={task}
            activeTaskId={activeTaskId}
            handleActiveTask={handleActiveTask}
            handleShowModal={handleShowModal}
            key={`task-item-${task.id}`}
          />
        ))
      )}

      {showModal && (
        <Modal closeModal={() => handleShowModal(null)} title={showModal.type}>
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
        </Modal>
      )}
    </>
  );
}
