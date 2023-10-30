import styles from './styles/task-modal.module.css';

import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@hooks/useFocusTrapping';
import useDeviceOrientation from '@hooks/useDeviceOrientation';
import type { ExtendedTask, OpenElement } from '@src/pages/index';

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

export default function TaskModal({ handleOpenElement, activeTask: task }: TaskModalProps) {
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
            className={styles.button}
            onClick={(e) => handleClick({ e, closeIsAllowed: true })}
            aria-label={t('a11y:aria.label.modal-close')}
            title={t('a11y:title.close')}
          >
            <i className="ri-close-line"></i>
          </button>

          <div className={styles.content}>
            <div className={styles.task}>
              <div className={styles.text}>{task.text}</div>

              <div className={styles.date}>
                {orientation === 'landscape' ? task.dateStringLong : task.dateStringShort} @{' '}
                {task.timeString}
              </div>
            </div>
          </div>

          <nav className={styles.options_nav}>
            {task.starred ? (
              <button
                type="button"
                className={styles.button + ' ' + styles.nav_button}
                aria-label={t('a11y:aria.label.unstar')}
                title={t('a11y:title.unstar')}
              >
                <i className="ri-star-fill"></i>
              </button>
            ) : (
              <button
                type="button"
                className={styles.button + ' ' + styles.nav_button}
                aria-label={t('a11y:aria.label.star')}
                title={t('a11y:title.star')}
              >
                <i className="ri-star-line"></i>
              </button>
            )}

            <button
              type="button"
              className={styles.button + ' ' + styles.nav_button}
              aria-label={t('a11y:aria.label.edit')}
              title={t('a11y:title.edit')}
            >
              <i className="ri-edit-line"></i>
            </button>

            <button
              type="button"
              className={styles.button + ' ' + styles.nav_button}
              aria-label={t('a11y:aria.label.delete')}
              title={t('a11y:title.delete')}
            >
              <i className="ri-delete-bin-2-line"></i>
            </button>
          </nav>
        </div>
      </Overlay>
    )
  );
}
