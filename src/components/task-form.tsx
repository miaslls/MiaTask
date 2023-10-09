import styles from '@/styles/home.module.css';

import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';

export default function TaskForm({
  inputText,
  handleChange,
  handleCreateForm,
}: {
  inputText: string;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleCreateForm(): void;
}) {
  async function submitPostData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCreateForm();

    const key = '/api/task';

    const response = await fetch(key, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    });

    if (response.ok) {
      toast.success('Task created!');
      mutate(key);
    } else {
      const error = await response.json();
      toast.error(error.message);
    }
  }

  return (
    <form className={styles.task_input_wrapper} onSubmit={submitPostData}>
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
