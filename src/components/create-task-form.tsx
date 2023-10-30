import styles from './styles/create-task-form.module.css';

import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@components/dismissable-error-toast';
import { ChangeEvent, FormEvent, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@hooks/useFocusTrapping';

async function submitPostData(
  e: FormEvent<HTMLFormElement>,
  inputText: string,
  closeForm: CallableFunction,
  translate: CallableFunction,
  lang: string,
) {
  e.preventDefault();
  closeForm();

  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';

  const response = await fetch(tasklist, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success(translate('created'), { id: toastId });
    mutate([tasklist, lang]);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export type CreateTaskFormProps = {
  inputText: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  closeForm(): void;
};

export default function CreateTaskForm({
  inputText,
  handleChange,
  closeForm,
}: CreateTaskFormProps) {
  const { t, lang } = useTranslation();

  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: closeForm });

  return (
    <form
      className={styles.task_form}
      onSubmit={(e) => submitPostData(e, inputText, closeForm, t, lang)}
      ref={formRef}
    >
      <input
        autoFocus
        required
        type="text"
        name="text"
        value={inputText}
        autoComplete="off"
        className={styles.task_input}
        placeholder={t('create-placeholder')}
        onChange={handleChange}
        aria-label={t('a11y:aria.label.create-input')}
        title={t('a11y:title.create-input')}
      />

      <button
        type="button"
        className={styles.input_icon}
        onClick={closeForm}
        aria-label={t('a11y:aria.label.close-create')}
        title={t('a11y:title.close')}
      >
        <i className="ri-close-line"></i>
      </button>

      <button className={styles.input_icon} type="submit" title={t('a11y:title.submit')}>
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
