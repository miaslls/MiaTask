import styles from './styles/modal-element.module.css';

import { ChangeEvent, useState } from 'react';
import useTranslation from '../../stubs/use-translation';
import useFocusTrapping from '../../hooks/use-focus-trapping';
import type { UiTask, OpenModalElement } from '../../types';
import { fallbackElementRef, fallbackTask, noop } from '../../mocks/fallbacks';

import UpdateForm from '../forms/update-form';

export type ModalUpdateProps = {
  task?: UiTask;
  modalRef?: React.MutableRefObject<HTMLElement | null>;
  closeModal?(): void;
  handleOpen?(element: OpenModalElement): void;
  onSubmitUpdate?(taskId: string, text: string): void;
};

export default function ModalUpdate({
  task = fallbackTask,
  modalRef = fallbackElementRef,
  closeModal = noop,
  handleOpen = noop,
  onSubmitUpdate,
}: ModalUpdateProps) {
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
        onSubmit={onSubmitUpdate}
      />
    </div>
  );
}
