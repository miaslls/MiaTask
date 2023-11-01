import styles from './styles/task-modal.module.css';

import { useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@hooks/useFocusTrapping';
import useDeviceOrientation from '@hooks/useDeviceOrientation';
import { toggleTaskAction } from '@src/lib/actions';

import type { ToggleTaskActionParams } from '@src/lib/actions';
import type { ExtendedTask, OpenElement } from '@src/pages/index';

import OptionsNav from './options-nav';
import ModalDelete from './modal-delete';
import ModalUpdate from './modal-update';

function Overlay({ children, closeModal }: { children: React.JSX.Element; closeModal(): void }) {
  return (
    <div className={styles.overlay} onClick={() => closeModal()}>
      {children}
    </div>
  );
}

export type TaskModalProps = {
  handleOpenElement(element?: OpenElement, task?: ExtendedTask): void;
  activeTask: ExtendedTask | null;
};

export type OpenModalElement = 'task' | 'update' | 'delete';

export default function TaskModal({ handleOpenElement, activeTask }: TaskModalProps) {
  const [task, setTask] = useState<ExtendedTask | null>(activeTask);
  const [openModalElement, setOpenModalElement] = useState<OpenModalElement>('task');

  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const orientation = useDeviceOrientation();

  type HandleClickParams = {
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>;
    closeIsAllowed: boolean;
  };

  function handleClick({ e, closeIsAllowed }: HandleClickParams) {
    e.stopPropagation();

    if (closeIsAllowed) {
      handleOpenElement();
    }
  }

  function handleOpenModalElement(element: OpenModalElement) {
    setOpenModalElement(element);
  }

  async function handleModalAction(actionParams: ToggleTaskActionParams) {
    const responseTask = await toggleTaskAction(actionParams);

    if (responseTask) {
      setTask(responseTask);
    }
  }

  useFocusTrapping({ elementRef: modalRef, escapeHatchFunc: handleOpenElement });

  return (
    task && (
      <Overlay closeModal={handleOpenElement}>
        <div
          className={styles.container}
          ref={modalRef}
          onClick={(e) => handleClick({ e, closeIsAllowed: false })}
        >
          <button
            className={styles.button + ' ' + styles.close_button}
            onClick={(e) => handleClick({ e, closeIsAllowed: true })}
            aria-label={t('a11y:aria.label.modal-close')}
            title={t('a11y:title.close')}
            autoFocus
          >
            <i className="ri-close-line"></i>
          </button>

          {openModalElement === 'task' && (
            <div className={styles.task_view}>
              <div className={styles.task}>
                <div className={styles.text}>{task.text}</div>

                <div className={styles.date}>
                  {orientation === 'landscape' ? task.dateStringLong : task.dateStringShort} @{' '}
                  {task.timeString}
                </div>
              </div>

              <OptionsNav
                task={task}
                handleModalAction={handleModalAction}
                handleOpenModalElement={handleOpenModalElement}
              />
            </div>
          )}

          {openModalElement === 'update' && (
            <ModalUpdate
              task={task}
              modalRef={modalRef}
              closeModal={handleOpenElement}
              handleOpen={handleOpenModalElement}
            />
          )}

          {openModalElement === 'delete' && (
            <ModalDelete
              taskId={task.id}
              modalRef={modalRef}
              closeModal={handleOpenElement}
              handleOpen={handleOpenModalElement}
            />
          )}
        </div>
      </Overlay>
    )
  );
}
