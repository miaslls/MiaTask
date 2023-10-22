import styles from './styles/create-task-form.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@/lib/toastUtils';
import { useFocusTrapping } from '@/hooks/useFocusTrapping';

async function submitPostData(
  e: FormEvent<HTMLFormElement>,
  inputText: string,
  handleForm: CallableFunction,
) {
  e.preventDefault();
  handleForm();

  const toastId = toast.loading('Loading...');

  const tasklist = '/api/task';

  const response = await fetch(tasklist, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Language': 'en' },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success('Task created!', { id: toastId });
    mutate(tasklist);
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
  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: handleForm });

  return (
    <form
      className={styles.task_form}
      onSubmit={(e) => submitPostData(e, inputText, handleForm)}
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
        placeholder="Enter new task..."
        onChange={handleChange}
        aria-label="Enter new task"
        title="New task text"
      />

      <button
        type="button"
        className={styles.task_input_icon}
        onClick={handleForm}
        aria-label="Close create task form"
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
