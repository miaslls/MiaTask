import styles from './styles/task-modal.module.css';

import { useRef, useState } from 'react';
import useTranslation from '../../stubs/use-translation';
import useFocusTrapping from '../../hooks/use-focus-trapping';
import useDeviceOrientation from '../../hooks/use-device-orientation';

import type { UiTask, OpenModalElement, TaskActionParams, TaskMutationHandlers } from '../../types';
import { fallbackTask, noop } from '../../mocks/fallbacks';

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

export type TaskModalProps = TaskMutationHandlers & {
  activeTask?: UiTask;
  closeModal?(): void;
};

export default function TaskModal({
  activeTask = fallbackTask,
  closeModal = noop,
  onToggleComplete,
  onToggleStar,
  onUpdateTaskText,
  onDeleteTask,
}: TaskModalProps) {
  const [task, setTask] = useState<UiTask>(activeTask);
  const [openModalElement, setOpenModalElement] = useState<OpenModalElement>('task');

  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const orientation = useDeviceOrientation();

  function handleClick({
    e,
    closeIsAllowed,
  }: {
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>;
    closeIsAllowed: boolean;
  }) {
    e.stopPropagation();

    if (closeIsAllowed) {
      closeModal();
    }
  }

  function handleOpenModalElement(element: OpenModalElement) {
    setOpenModalElement(element);
  }

  function handleModalAction({ id, action }: TaskActionParams) {
    if (action === 'complete') {
      onToggleComplete?.(id);
      setTask((current) => ({ ...current, completed: !current.completed }));
      return;
    }

    onToggleStar?.(id);
    setTask((current) => ({ ...current, starred: !current.starred }));
  }

  useFocusTrapping({ elementRef: modalRef, escapeHatchFunc: closeModal });

  return (
    <Overlay closeModal={closeModal}>
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
                {orientation === 'landscape' ? task.dateStringLong : task.dateStringShort} @ {task.timeString}
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
            closeModal={closeModal}
            handleOpen={handleOpenModalElement}
            onSubmitUpdate={(taskId, text) => {
              onUpdateTaskText?.(taskId, text);
              setTask((current) => ({ ...current, text }));
            }}
          />
        )}

        {openModalElement === 'delete' && (
          <ModalDelete
            taskId={task.id}
            modalRef={modalRef}
            closeModal={closeModal}
            handleOpen={handleOpenModalElement}
            onConfirmDelete={onDeleteTask}
          />
        )}
      </div>
    </Overlay>
  );
}
