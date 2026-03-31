import styles from './styles/update-form.module.css';

import { ChangeEvent, FormEvent } from 'react';
import useTranslation from '../../stubs/use-translation';
import type { OpenModalElement } from '../../types';
import { noop, noopInputChange } from '../../mocks/fallbacks';

export type UpdateFormProps = {
  taskId?: string;
  inputText?: string;
  handleChange?(e: ChangeEvent<HTMLInputElement>): void;
  handleOpen?(element: OpenModalElement): void;
  onSubmit?(taskId: string, text: string): void;
};

export default function UpdateForm({
  taskId = 'task-0',
  inputText = '',
  handleChange = noopInputChange,
  handleOpen = noop,
  onSubmit,
}: UpdateFormProps) {
  const { t } = useTranslation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(taskId, inputText);
    handleOpen('task');
  }

  return (
    <form className={styles.update_form} onSubmit={handleSubmit}>
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
