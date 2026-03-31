import styles from './styles/modal-element.module.css';

import useTranslation from '../../stubs/use-translation';
import useFocusTrapping from '../../hooks/use-focus-trapping';
import type { OpenModalElement } from '../../types';
import { fallbackElementRef, noop } from '../../mocks/fallbacks';

export type ModalDeleteProps = {
  taskId?: string;
  modalRef?: React.MutableRefObject<HTMLElement | null>;
  closeModal?(): void;
  handleOpen?(element: OpenModalElement): void;
  onConfirmDelete?(taskId: string): void;
};

export default function ModalDelete({
  taskId = 'task-fallback',
  modalRef = fallbackElementRef,
  closeModal = noop,
  handleOpen = noop,
  onConfirmDelete,
}: ModalDeleteProps) {
  const { t } = useTranslation();

  useFocusTrapping({ elementRef: modalRef, escapeHatchFunc: closeModal });

  return (
    <div className={styles.delete_container}>
      <div className="wrapper">
        <div className={styles.title}>
          <i className="ri-alert-line"></i>
          {' ' + t('confirm')}
        </div>

        <div className={styles.subtitle}>{t('cannot-undo')}</div>
      </div>

      <div className={styles.delete_buttons}>
        <button
          type="button"
          className={styles.button + ' force_focus'}
          onClick={() => handleOpen('task')}
          aria-label={t('a11y:aria.label.go-back')}
          title={t('a11y:title.back')}
          autoFocus
        >
          <i className="ri-arrow-go-back-line"></i>
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            onConfirmDelete?.(taskId);
            closeModal();
          }}
          aria-label={t('a11y:title.delete')}
          title={t('a11y:title.delete')}
        >
          <i className="ri-delete-bin-2-line"></i>
        </button>
      </div>
    </div>
  );
}
