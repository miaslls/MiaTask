import { DefaultToastOptions, toast } from 'react-hot-toast';

export const toastOptions: DefaultToastOptions = {
  style: {
    background: 'var(--white-translucent)',
    boxShadow: '0.175rem 0.175rem var(--gray-translucent)',
    color: 'var(--black)',
    borderRadius: 0,
  },
  success: {
    iconTheme: {
      primary: 'var(--green)',
      secondary: 'var(--white-translucent)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--red)',
      secondary: 'var(--white-translucent)',
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
        <i
          className="ri-close-line"
          onClick={() => toast.dismiss(t.id)}
          aria-label="Close alert"
        ></i>
      </div>
    ),
    { duration: Infinity },
  );
};
