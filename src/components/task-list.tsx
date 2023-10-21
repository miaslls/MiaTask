import useSWR from 'swr';
import { ChangeEvent } from 'react';
import { Task } from '@prisma/client';
import type { ShowModal } from '@/pages';

import Modal from './modal';
import TaskModal from './task-modal';
import TaskItem from './task-item';

export type TaskListProps = {
  showModal: ShowModal;
  showTaskOptions: Task | null;
  taskToUpdate: string | null;
  updateInputText: string;
  handleShowModal(showmodal: ShowModal): void;
  handleShowOptions(task?: Task): void;
  handleUpdateChange(e: ChangeEvent<HTMLInputElement>): void;
  handleUpdateForm(task?: Task): void;
};

export default function TaskList({
  showModal,
  showTaskOptions,
  taskToUpdate,
  updateInputText,
  handleShowModal,
  handleShowOptions,
  handleUpdateChange,
  handleUpdateForm,
}: TaskListProps) {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/task', fetcher);

  if (error)
    return (
      <div className="tasklist_alert">
        <i className="ri-alert-line"></i> Failed to load tasklist
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
            showTaskOptions={showTaskOptions}
            handleShowOptions={handleShowOptions}
            handleShowModal={handleShowModal}
            inputText={updateInputText}
            taskToUpdate={taskToUpdate}
            handleChange={handleUpdateChange}
            handleForm={handleUpdateForm}
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
