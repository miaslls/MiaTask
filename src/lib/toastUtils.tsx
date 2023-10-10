import { DefaultToastOptions, toast } from 'react-hot-toast';

export const toastOptions: DefaultToastOptions = {
  style: {
    background: 'var(--white-transluscent)',
    color: 'var(--black)',
    borderRadius: 0,
  },
  success: {
    iconTheme: {
      primary: 'var(--green)',
      secondary: 'var(--white-transluscent)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--red)',
      secondary: 'var(--white-transluscent)',
    },
  },
};

export const dismissableErrorToast = (message: string) => {
  return toast.error(
    (t) => (
      <div className="toast_dismissable">
        <span>
          <strong>Error:</strong> {message}
        </span>
        <i className="ri-close-line" onClick={() => toast.dismiss(t.id)}></i>
      </div>
    ),
    { duration: Infinity },
  );
};
