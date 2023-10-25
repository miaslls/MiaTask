import useSWR from 'swr';
import { ChangeEvent } from 'react';
import { Task } from '@prisma/client';
import { fetcher } from '@/lib/fetcher';
import type { ShowModal } from '@/pages';
import useTranslation from 'next-translate/useTranslation';

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
  const { t, lang } = useTranslation('common');

  const url = '/api/task';

  const { data, error, isLoading } = useSWR([url, lang], ([url, lang]) =>
    fetcher(url, { headers: { 'Accept-Language': lang } }),
  );

  if (error) {
    return (
      <div className="tasklist_alert">
        <i className="ri-alert-line"></i> {t('tasklist-fail')}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="tasklist_alert">
        <i className="ri-loop-right-fill"></i> {t('loading')}
      </div>
    );
  }

  return (
    <>
      {data.tasks.length === 0 ? (
        <div className="tasklist_alert">
          <i className="ri-alert-line"></i> {t('tasklist-empty')}
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
