import { DefaultToastOptions, toast } from 'react-hot-toast';

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

export const dismissableErrorToast = (message: string) => {
  return toast.error(
    (t) => (
      <div className="toast_dismissable" role="alertdialog" aria-label="Error">
        <span>
          <strong>Error:</strong> {message}
        </span>
        <button onClick={() => toast.dismiss(t.id)} aria-label="Close alert" autoFocus>
          <i className="ri-close-line"></i>
        </button>
      </div>
    ),
    { duration: 5000 },
  );
};
