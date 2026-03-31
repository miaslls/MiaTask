import styles from './styles/create-form.module.css';

import { ChangeEvent, FormEvent, useRef } from 'react';
import useTranslation from '../../stubs/use-translation';
import useFocusTrapping from '../../hooks/use-focus-trapping';
import { noop, noopInputChange } from '../../mocks/fallbacks';

export type CreateFormProps = {
  inputText?: string;
  handleChange?(e: ChangeEvent<HTMLInputElement>): void;
  closeForm?(): void;
  onSubmit?(text: string): void;
};

export default function CreateForm({
  inputText = '',
  handleChange = noopInputChange,
  closeForm = noop,
  onSubmit,
}: CreateFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement | null>(null);

  useFocusTrapping({ elementRef: formRef, escapeHatchFunc: closeForm });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(inputText);
    closeForm();
  }

  return (
    <form className={styles.create_form} onSubmit={handleSubmit} ref={formRef}>
      <input
        autoFocus
        required
        type="text"
        name="text"
        value={inputText}
        autoComplete="off"
        className={styles.create_input}
        placeholder={t('create-placeholder')}
        onChange={handleChange}
        aria-label={t('a11y:aria.label.create-input')}
        title={t('a11y:title.create-input')}
      />

      <button
        type="button"
        className={styles.create_button}
        onClick={closeForm}
        aria-label={t('a11y:aria.label.close-create')}
        title={t('a11y:title.close')}
      >
        <i className="ri-close-line"></i>
      </button>

      <button className={styles.create_button} type="submit" title={t('a11y:title.submit')}>
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
}
