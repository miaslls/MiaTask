import styles from './styles/create-task-form.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@components/dismissable-error-toast';
import useTranslation from 'next-translate/useTranslation';
import useFocusTrapping from '@hooks/useFocusTrapping';

async function submitPostData(
  e: FormEvent<HTMLFormElement>,
  inputText: string,
  handleForm: CallableFunction,
  translate: CallableFunction,
  lang: string,
) {
  e.preventDefault();
  handleForm();

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
  handleForm(): void;
};

export default function CreateTaskForm({
  inputText,
  handleChange,
  handleForm,
}: CreateTaskFormProps) {
  const { t, lang } = useTranslation('common');

  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: handleForm });

  return (
    <form
      className={styles.task_form}
      onSubmit={(e) => submitPostData(e, inputText, handleForm, t, lang)}
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
        className={styles.task_input_icon}
        onClick={handleForm}
        aria-label={t('a11y:aria.label.close-create')}
        title={t('a11y:title.close')}
      >
        <i className="ri-close-line"></i>
      </button>

      <button className={styles.task_input_icon} type="submit" title={t('a11y:title.submit')}>
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
