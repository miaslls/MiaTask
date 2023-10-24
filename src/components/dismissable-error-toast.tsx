import toast from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';

export const dismissableErrorToast = (message: string) => {
  return toast.error((toast) => <DismissableErrorToast message={message} toastId={toast.id} />, {
    duration: 5000,
  });
};

export type DismissableErrorToastProps = {
  message: string;
  toastId: string;
};

export default function DismissableErrorToast({ message, toastId }: DismissableErrorToastProps) {
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
