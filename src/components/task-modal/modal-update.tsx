import styles from './styles/modal-element.module.css';

import { ChangeEvent, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@root/src/hooks/useFocusTrapping';
import type { OpenModalElement } from '@root/src/components/task-modal/task-modal';
import type { ExtendedTask } from '@src/pages/index';

import UpdateForm from '../forms/update-form';

export type ModalUpdateProps = {
  task: ExtendedTask;
  modalRef: React.MutableRefObject<HTMLElement | null>;
  closeModal(): void;
  handleOpen(element: OpenModalElement): void;
};

export default function ModalUpdate({ task, modalRef, closeModal, handleOpen }: ModalUpdateProps) {
  const { t } = useTranslation();

  const [updateInputText, setUpdateInputText] = useState(task.text);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateInputText(e.target.value);
  }

  useFocusTrapping({ elementRef: modalRef, escapeHatchFunc: closeModal });

  return (
    <div className={styles.update_container}>
      <div className={styles.title}>{t('update-task')}</div>

      <UpdateForm
        inputText={updateInputText}
        handleChange={handleInputChange}
        taskId={task.id}
        handleOpen={handleOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
