import styles from './styles/update-form.module.css';

import { ChangeEvent, FormEvent } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@src/lib/toast';
import useTranslation from 'next-translate/useTranslation';
import type { OpenModalElement } from '@components/task-modal';

type submitPatchDataParams = {
  e: FormEvent<HTMLFormElement>;
  taskId: string;
  inputText: string;
  closeModal: CallableFunction;
  translate: CallableFunction;
  lang: string;
};

async function submitPatchData({
  e,
  taskId,
  inputText,
  closeModal,
  translate,
  lang,
}: submitPatchDataParams) {
  e.preventDefault();
  closeModal();

  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const url = `/api/task/${taskId}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success(translate('updated'), { id: toastId });
    mutate([tasklist, lang]);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export type UpdateFormProps = {
  taskId: string;
  inputText: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleOpen(element: OpenModalElement): void;
  closeModal(): void;
};

export default function UpdateForm({
  taskId,
  inputText,
  handleChange,
  handleOpen,
  closeModal,
}: UpdateFormProps) {
  const { t, lang } = useTranslation();

  return (
    <form
      className={styles.update_form}
      onSubmit={(e) => submitPatchData({ e, taskId, inputText, closeModal, translate: t, lang })}
    >
      <input
        autoFocus
        required
        type="text"
        name="text"
        value={inputText}
        autoComplete="off"
        className={styles.update_input}
        placeholder={t('update-placeholder')}
        onChange={handleChange}
        aria-label={t('a11y:aria.label.update-input')}
        title={t('a11y:title.update-input')}
      />

      <fieldset className={styles.update_buttons}>
        <button
          type="button"
          className={styles.update_button}
          onClick={() => handleOpen('task')}
          aria-label={t('a11y:aria.label.go-back')}
          title={t('a11y:title.back')}
        >
          <i className="ri-arrow-go-back-line"></i>
        </button>

        <button type="submit" className={styles.update_button} title={t('a11y:title.submit')}>
          <i className="ri-edit-line"></i>
        </button>
      </fieldset>
    </form>
  );
}
