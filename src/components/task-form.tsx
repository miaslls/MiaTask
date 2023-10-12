import styles from '@/styles/home.module.css';

import { ChangeEvent, FormEvent } from 'react';
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
    headers: { 'Content-Type': 'application/json' },
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
        placeholder="Type your task here..."
        onChange={handleChange}
      />

      <button className={styles.task_input_icon} type="submit">
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
