import styles from './styles/update-task-form.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@/components/dismissable-error-toast';
import { useFocusTrapping } from '@/hooks/useFocusTrapping';
import useTranslation from 'next-translate/useTranslation';

async function submitPatchData(
  e: FormEvent<HTMLFormElement>,
  id: string,
  inputText: string,
  handleUpdateForm: CallableFunction,
  translate: CallableFunction,
) {
  e.preventDefault();
  handleUpdateForm();

  const toastId = toast.loading(translate('loading'));

  const tasklist = '/api/task';
  const url = `/api/task/${id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Content-Language': 'en' },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success(translate('updated'), { id: toastId });
    mutate(tasklist);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export type UpdateTaskFormProps = {
  taskId: string;
  inputText: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleForm(): void;
};

export default function UpdateTaskForm({
  taskId,
  inputText,
  handleChange,
  handleForm,
}: UpdateTaskFormProps) {
  const { t } = useTranslation('common');

  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: handleForm });

  return (
    <form
      className={styles.task_form}
      onSubmit={(e) => submitPatchData(e, taskId, inputText, handleForm, t)}
      ref={formRef}
    >
      <div className={styles.task_edit_icons}>
        <div className={styles.task_edit_icon}>
          <i className="ri-checkbox-blank-line"></i>
        </div>

        <div className={styles.task_edit_icon}>
          <i className="ri-more-2-fill"></i>
        </div>
      </div>

      <input
        autoFocus
        required
        type="text"
        name="text"
        value={inputText}
        autoComplete="off"
        className={styles.task_input}
        placeholder={t('update-placeholder')}
        onChange={handleChange}
        aria-label={t('a11y:aria.label.update-input')}
        title={t('a11y:title.update-input')}
      />

      <button
        type="button"
        className={styles.task_input_icon}
        onClick={handleForm}
        aria-label={t('a11y:aria.label.close-update')}
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
