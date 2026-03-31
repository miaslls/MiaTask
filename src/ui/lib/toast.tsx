import useTranslation from '../stubs/use-translation';

export const toastOptions = {
  style: {
    background: 'var(--bg-color-translucent)',
    boxShadow: '0.175rem 0.175rem var(--gray-translucent)',
    color: 'var(--fg-color)',
    borderRadius: 0,
  },
  success: {
    iconTheme: {
      primary: 'var(--green)',
      secondary: 'var(--bg-color-translucent)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--red)',
      secondary: 'var(--bg-color-translucent)',
    },
  },
};

export type DismissableErrorToastProps = {
  message: string;
  onDismiss?(): void;
};

export function dismissableErrorToast(message: string) {
  return { kind: 'error', message };
}

export function DismissableErrorToast({ message, onDismiss }: DismissableErrorToastProps) {
  const { t } = useTranslation('a11y');

  return (
    <div className="toast_dismissable" role="alertdialog" aria-label={t('aria.label.error-alert')}>
      <span>
        <strong>{t('common:error')}:</strong> {message}
      </span>
      <button onClick={onDismiss} aria-label={t('aria.label.close-alert')} title={t('title.close')} autoFocus>
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
}

