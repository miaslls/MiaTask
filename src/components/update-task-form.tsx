import styles from './styles/update-task-form.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@/lib/toastUtils';
import { useFocusTrapping } from '@/hooks/useFocusTrapping';

async function submitPatchData(
  e: FormEvent<HTMLFormElement>,
  id: string,
  inputText: string,
  handleUpdateForm: CallableFunction,
) {
  e.preventDefault();
  handleUpdateForm();

  const toastId = toast.loading('Loading...');

  const tasklist = '/api/task';
  const key = `/api/task/${id}`;

  const response = await fetch(key, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Content-Language': 'en' },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success('Task updated!', { id: toastId });
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
  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: handleForm });

  return (
    <form
      className={styles.task_form}
      onSubmit={(e) => submitPatchData(e, taskId, inputText, handleForm)}
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
        placeholder="Enter updated task..."
        onChange={handleChange}
        aria-label="Enter updated task"
        title="Updated task text"
      />

      <button
        type="button"
        className={styles.task_input_icon}
        onClick={handleForm}
        aria-label="Close update task form"
        title="Close"
      >
        <i className="ri-close-line"></i>
      </button>

      <button className={styles.task_input_icon} type="submit" title="Submit">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
