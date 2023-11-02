import styles from './styles/modal-element.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@src/lib/toast';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@root/src/hooks/useFocusTrapping';

import type { OpenModalElement } from '@root/src/components/task-modal/task-modal';

type RemoveTaskParams = {
  id: string;
  closeModal: CallableFunction;
  translate: CallableFunction;
  lang: string;
};

async function removeTask({ id, closeModal, translate, lang }: RemoveTaskParams) {
  closeModal();

  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const url = `/api/task/${id}`;

  const response = await fetch(url, { method: 'DELETE', headers: { 'Accept-Language': lang } });

  if (response.ok) {
    toast.success(translate('removed'), { id: toastId });
    mutate([tasklist, lang]);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export type ModalDeleteProps = {
  taskId: string;
  modalRef: React.MutableRefObject<HTMLElement | null>;
  closeModal(): void;
  handleOpen(element: OpenModalElement): void;
};

export default function ModalDelete({
  taskId,
  modalRef,
  closeModal,
  handleOpen,
}: ModalDeleteProps) {
  const { t, lang } = useTranslation();

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
          onClick={() => removeTask({ id: taskId, closeModal, translate: t, lang })}
          aria-label={t('a11y:title.delete')}
          title={t('a11y:title.delete')}
        >
          <i className="ri-delete-bin-2-line"></i>
        </button>
      </div>
    </div>
  );
}
