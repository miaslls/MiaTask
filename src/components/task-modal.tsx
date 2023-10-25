import styles from './styles/task-modal.module.css';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { dismissableErrorToast } from '@/components/dismissable-error-toast';
import useTranslation from 'next-translate/useTranslation';
import type { ShowModal } from '@/pages';

async function removeTask(
  id: string,
  handleShowModal: CallableFunction,
  translate: CallableFunction,
  lang: string,
) {
  handleShowModal(null);

  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const url = `/api/task/${id}`;

  const response = await fetch(url, { method: 'DELETE', headers: { 'Accept-Language': lang } });

  if (response.ok) {
    toast.success(translate('removed'), { id: toastId });
    mutate(tasklist);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

type TaskModalProps = {
  showModal: ShowModal;
  handleShowModal(showModal: ShowModal): void;
};

export default function TaskModal({ showModal, handleShowModal }: TaskModalProps) {
  const { t, lang } = useTranslation('common');

  return (
    showModal && (
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.quote}>
            <i className="ri-double-quotes-l"></i>
          </div>
          {showModal.task.text}
          <div className={styles.quote}>
            <i className="ri-double-quotes-r"></i>
          </div>
        </div>

        {showModal.type === 'delete' && (
          <>
            <div className={styles.confirm_delete}>
              <div className={styles.delete_text}>{t('confirm-delete')}</div>

              <div className={styles.delete_buttons}>
                <button
                  type="button"
                  className={styles.delete_button + ' force_focus'}
                  onClick={() => handleShowModal(null)}
                  aria-label={t('a11y:aria.label.cancel-delete')}
                  title={t('a11y:title.cancel')}
                  autoFocus
                >
                  <i className="ri-close-line"></i>
                </button>

                <button
                  type="button"
                  className={styles.delete_button}
                  onClick={() => removeTask(showModal.task.id, handleShowModal, t, lang)}
                  aria-label={t('a11y:aria.label.confirm-delete')}
                  title={t('a11y:title.confirm')}
                >
                  <i className="ri-check-line"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
}
