import useSWR from 'swr';
import { useState } from 'react';
import { Task } from '@prisma/client';

import TaskItem from './task-item';
import Modal from './modal';
import TaskModal from './task-modal';

export type ShowModal = {
  type: 'details' | 'delete';
  task: Task;
};

export default function TaskList() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<ShowModal | null>(null);

  const handleShowModal = (showModal: ShowModal | null) => {
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
          <TaskModal showModal={showModal} handleShowModal={handleShowModal} />
        </Modal>
      )}
    </>
  );
}
