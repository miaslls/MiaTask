import styles from './styles/task-form.module.css';

import { ChangeEvent, FormEvent, useEffect } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { dismissableErrorToast } from '@/lib/toastUtils';

async function submitPostData(
  e: FormEvent<HTMLFormElement>,
  inputText: string,
  handleCreateForm: CallableFunction,
) {
  e.preventDefault();
  handleCreateForm();

  const toastId = toast.loading('Loading...');

  const key = '/api/task';

  const response = await fetch(key, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Language': 'en' },
    body: JSON.stringify({ text: inputText }),
  });

  if (response.ok) {
    toast.success('Task created!', { id: toastId });
    mutate(key);
  } else {
    const error = await response.json();
    dismissableErrorToast(error.message);
    toast.dismiss(toastId);
  }
}

export default function TaskForm({
  inputText,
  handleChange,
  handleCreateForm,
}: {
  inputText: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleCreateForm(): void;
}) {
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCreateForm();
      }
    };

    document.addEventListener('keydown', (e) => keyDownHandler(e));

    return () => {
      document.removeEventListener('keydown', (e) => keyDownHandler(e));
    };
  }, []);

  return (
    <form
      className={styles.task_input_wrapper}
      onSubmit={(e) => submitPostData(e, inputText, handleCreateForm)}
    >
      <input
        autoFocus
        required
        type="text"
        name="text"
        value={inputText}
        className={styles.task_input}
        placeholder="Type new task..."
        onChange={handleChange}
        aria-label="Type new task"
        title="New task text"
      />

      <button
        type="button"
        className={styles.task_input_icon}
        onClick={handleCreateForm}
        aria-label="Close create task form"
        title="Close"
      >
        <i className="ri-close-line"></i>
      </button>

      <button className={styles.task_input_icon} type="submit" title="Submit data">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
