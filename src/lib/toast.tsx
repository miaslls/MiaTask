import toast from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';
import type { DefaultToastOptions } from 'react-hot-toast';

export const toastOptions: DefaultToastOptions = {
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

export function dismissableErrorToast(message: string) {
  return toast.error((toast) => <DismissableErrorToast message={message} toastId={toast.id} />, {
    duration: 5000,
  });
}

export type DismissableErrorToastProps = {
  message: string;
  toastId: string;
};

function DismissableErrorToast({ message, toastId }: DismissableErrorToastProps) {
  const { t } = useTranslation('a11y');

  return (
    <div className="toast_dismissable" role="alertdialog" aria-label={t('aria.label.error-alert')}>
      <span>
        <strong>{t('common:error')}:</strong> {message}
      </span>
      <button
        onClick={() => toast.dismiss(toastId)}
        aria-label={t('aria.label.close-alert')}
        title={t('title.close')}
        autoFocus
      >
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
}
